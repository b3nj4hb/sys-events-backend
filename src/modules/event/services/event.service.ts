import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { EventTypeEntity } from '../entities/event-type.entity'; // Importa la entidad EventType
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { R2Client } from 'src/config/cloudflare-r2.config';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(EventEntity)
		private readonly eventRepository: Repository<EventEntity>,

		@InjectRepository(EventTypeEntity)
		private readonly eventTypeRepository: Repository<EventTypeEntity>,
	) {}

	async getEventsWithStudents(): Promise<any> {
		return this.eventRepository
			.createQueryBuilder('event')
			.leftJoinAndSelect('event.eventType', 'eventType') // Join con la tabla eventType
			.leftJoinAndSelect('event.studentEvent', 'studentEvent') // Join con la tabla studentEvent
			.leftJoinAndSelect('studentEvent.student', 'student') // Join con la tabla student a través de studentEvent
			.leftJoinAndSelect('student.profile', 'profile') // Join con la tabla profile a través de student
			.leftJoinAndSelect('profile.role', 'role') // Join con la tabla role a través de profile
			.leftJoinAndSelect('student.carrier', 'carrier') // Join con la tabla carrier a través de student
			.leftJoinAndSelect('carrier.faculty', 'faculty') // Join con la tabla faculty a través de carrier
			.leftJoinAndSelect('student.cycle', 'cycle') // Join con la tabla cycle a través de student
			.select([
				// Datos del evento
				'event.id',
				'event.name',
				'event.date',
				'event.hour',
				'event.location',
				'event.period',
				'eventType.name',

				// Datos del studentEvent
				'studentEvent.assistante',

				// Datos del estudiante y sus subclases
				'student.id',
				'profile.id',
				'profile.fullName',
				'profile.avatarUrl',
				'profile.code',
				'profile.phone',
				'profile.email',

				// Datos del rol asociado al perfil
				'role.name',

				// Datos de la carrera y facultad asociada
				'carrier.name',
				'faculty.name',

				// Datos del ciclo asociado
				'cycle.name',
			])
			.getMany();
	}

	async createEvent(createEventDto: EventDto): Promise<EventEntity> {
		const { name, date, hour, location, period, eventTypeId, file } = createEventDto;

		// Buscar el tipo de evento por su ID
		const eventType = await this.eventTypeRepository.findOne({
			where: { id: eventTypeId },
		});

		//const eventType = await this.eventTypeRepository.findOne({ where: { name: eventTypeName } });

		/*if (!eventType) {
      throw new NotFoundException('Event type not found');
    }*/
		if (!eventType) {
			throw new NotFoundException(`Event type with name "${eventTypeId}" not found`);
		}

		// Inicializar fileId y fileUrl
		let fileId: string | undefined;
		let fileUrl: string | undefined;

		// Subir el archivo a R2 si está presente en la solicitud
		if (file) {
			fileId = `${Date.now()}-${file.originalname}`; // Generar un ID único para el archivo
			fileUrl = `${process.env.DEV_BUCKET_URL}/${fileId}`;

			const command = new PutObjectCommand({
				Bucket: process.env.BUCKET, // El bucket de R2
				Key: fileId, // El nombre del archivo
				Body: file.buffer, // El contenido del archivo
				ContentType: file.mimetype, // Tipo MIME del archivo
			});

			await R2Client.send(command); // Ejecutar la subida del archivo
		}
		// Crear un nuevo evento con los datos proporcionados
		const event = this.eventRepository.create({
			name,
			date,
			hour,
			location,
			period,
			eventType, // Asocia el tipo de evento encontrado
			fileId, // ID del archivo en el bucket
			fileUrl, // URL para acceder al archivo
		});

		// Guardar el evento en la base de datos
		return this.eventRepository.save(event);
	}

	// Método para actualizar un evento existente
	async updateEvent(updateEventDto: EventDto): Promise<EventEntity> {
		const { id, name, date, hour, location, period, eventTypeId, fileId, fileUrl, file } = updateEventDto;

		// Buscar el evento por su ID
		const event = await this.eventRepository.findOne({ where: { id } });

		if (!event) {
			throw new NotFoundException(`Event with ID "${id}" not found`);
		}

		// Buscar el tipo de evento por su ID
		const eventType = await this.eventTypeRepository.findOne({
			where: { id: eventTypeId },
		});

		if (!eventType) {
			throw new NotFoundException(`Event type with ID "${eventTypeId}" not found`);
		}

		// Actualizar los campos del evento
		if (name) event.name = name;
		if (date) event.date = date;
		if (hour) event.hour = hour;
		if (location) event.location = location;
		if (period) event.period = period;
		if (eventType) event.eventType = eventType;

		// Actualizar fileId y fileUrl si se proporcionan
		if (fileId) event.fileId = fileId;
		if (fileUrl) event.fileUrl = fileUrl;

		// Si se proporciona un archivo nuevo, manejar la subida y actualización
		if (file) {
			// Eliminar el archivo antiguo del bucket
			if (event.fileId) {
				await this.deleteFile(event.id);
			}

			// Subir el nuevo archivo
			const newFileId = `${Date.now()}-${file.originalname}`; // Generar un ID único para el archivo
			const newFileUrl = `${process.env.DEV_BUCKET_URL}/${newFileId}`;

			const command = new PutObjectCommand({
				Bucket: process.env.BUCKET, // El bucket de R2
				Key: newFileId, // El nombre del archivo
				Body: file.buffer, // El contenido del archivo
				ContentType: file.mimetype, // Tipo MIME del archivo
			});

			await R2Client.send(command); // Ejecutar la subida del archivo

			// Actualizar el evento con el nuevo archivo
			event.fileId = newFileId;
			event.fileUrl = newFileUrl;
		}

		// Guardar los cambios en la base de datos
		return this.eventRepository.save(event);
	}

	async deleteFile(eventId: string): Promise<void> {
		// Buscar el evento por ID
		const event = await this.eventRepository.findOne({
			where: { id: eventId },
		});

		if (!event) {
			throw new NotFoundException(`Event with ID "${eventId}" not found`);
		}

		// Verificar si el evento tiene un archivo asociado
		if (event.fileId && event.fileUrl) {
			// Eliminar el archivo del bucket
			const command = new DeleteObjectCommand({
				Bucket: process.env.BUCKET,
				Key: event.fileId, // ID del archivo en el bucket
			});

			await R2Client.send(command); // Ejecutar la eliminación del archivo

			// Actualizar el registro en la base de datos
			event.fileId = null;
			event.fileUrl = null;

			await this.eventRepository.save(event);
		} else {
			// Si no hay archivo asociado, solo actualiza el registro
			console.log('No file to delete for event ID:', eventId);
		}
	}

	async deleteEvent(eventId: string): Promise<void> {
		// Buscar el evento por ID
		const event = await this.eventRepository.findOne({
			where: { id: eventId },
		});

		if (!event) {
			throw new NotFoundException(`Event with ID "${eventId}" not found`);
		}

		// Eliminar el archivo del bucket si existe
		if (event.fileId) {
			await this.deleteFile(event.id);
		}

		// Eliminar el evento de la base de datos
		await this.eventRepository.remove(event);
	}
}
