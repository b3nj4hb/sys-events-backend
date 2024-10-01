import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { EventTypeEntity } from '../entities/event-type.entity'; // Importa la entidad EventType
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { R2Client } from 'src/config/cloudflare-r2.config';
import { EventDto } from '../dto/event.dto';
import { EventUpdateDto } from '../dto/event-update.dto';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { StudentEventEntity } from 'src/modules/student-event/entities/student-event.entity';
import { CarrierEntity } from 'src/modules/carrier/entities/carrier.entity';

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(EventEntity)
		private readonly eventRepository: Repository<EventEntity>,

		@InjectRepository(EventTypeEntity)
		private readonly eventTypeRepository: Repository<EventTypeEntity>,

		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,

		@InjectRepository(CarrierEntity)
		private readonly carrierRepository: Repository<CarrierEntity>,

		@InjectRepository(StudentEventEntity)
		private readonly studentEventRepository: Repository<StudentEventEntity>,
	) {}

	async getEvents(): Promise<any> {
		const events = await this.eventRepository
			.createQueryBuilder('event')
			.leftJoinAndSelect('event.eventType', 'eventType') // Join con la tabla eventType
			.leftJoinAndSelect('event.studentEvent', 'studentEvent')
			.leftJoinAndSelect('event.carrier', 'carrier') // Join con la tabla carrier
			.leftJoinAndSelect('carrier.faculty', 'faculty') // Join con la tabla faculty a través de carrier
			.getMany();

		return events;
	}

	async getEventById(eventId: string): Promise<any> {
		const event = await this.eventRepository
			.createQueryBuilder('event')
			.leftJoinAndSelect('event.eventType', 'eventType') // Join con la tabla eventType
			.leftJoinAndSelect('event.studentEvent', 'studentEvent') // Join con la tabla studentEvent
			.leftJoinAndSelect('studentEvent.student', 'student') // Join con la tabla student a través de studentEvent
			.leftJoinAndSelect('student.profile', 'profile') // Join con la tabla profile a través de student
			.leftJoinAndSelect('profile.role', 'role') // Join con la tabla role a través de profile
			.leftJoinAndSelect('student.carrier', 'carrier') // Join con la tabla carrier a través de student
			.leftJoinAndSelect('carrier.faculty', 'faculty') // Join con la tabla faculty a través de carrier
			.leftJoinAndSelect('student.cycle', 'cycle') // Join con la tabla cycle a través de student
			.leftJoinAndSelect('studentEvent.justifications', 'justifications') // Join con la tabla justifications a través de studentEvent
			.where('event.id = :id', { id: eventId })
			.getOne();

		if (!event) {
			throw new NotFoundException(`Event with ID "${eventId}" not found`);
		}

		event.studentEvent.forEach((studentEvent: any) => {
			studentEvent.student.profile.password = undefined;
		});

		return event;
	}

	async createEvent(createEventDto: EventDto): Promise<EventEntity> {
		const { name, date, hour, location, period, eventTypeId, carrierId, file } = createEventDto;

		// Buscar el tipo de evento por su ID
		const eventType = await this.eventTypeRepository.findOne({
			where: { id: eventTypeId },
		});

		if (!eventType) {
			throw new NotFoundException(`Event type with ID "${eventTypeId}" not found`);
		}

		// Buscar el carrier por su ID
		const carrier = await this.carrierRepository.findOne({
			where: { id: carrierId },
		});

		if (!carrier) {
			throw new NotFoundException(`Carrier with ID "${carrierId}" not found`);
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
			carrier, // Asocia el carrier encontrado
			fileId, // ID del archivo en el bucket
			fileUrl, // URL para acceder al archivo
		});

		// Guardar el evento en la base de datos
		const savedEvent = await this.eventRepository.save(event);

		// Obtener todos los estudiantes del carrier
		const students = await this.studentRepository.find({
			where: { carrier: { id: carrierId } },
		});

		// Crear registros en la tabla studentEvent para cada estudiante
		const studentEvents = students.map((student) => {
			return this.studentEventRepository.create({
				assistance: false,
				student,
				event: savedEvent,
			});
		});

		// Guardar los registros en la base de datos
		await this.studentEventRepository.save(studentEvents);

		return savedEvent;
	}

	// Método para actualizar un evento existente
	async updateEvent(updateEventDto: EventUpdateDto): Promise<EventEntity> {
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

	async getEventTypes(): Promise<EventTypeEntity[]> {
		return this.eventTypeRepository.find();
	}

	async getStudentEventsByProfileCode(profileCode: string): Promise<any> {
		const student = await this.studentRepository
			.createQueryBuilder('student')
			.leftJoinAndSelect('student.profile', 'profile')
			.leftJoinAndSelect('student.studentEvent', 'studentEvent')
			.leftJoinAndSelect('studentEvent.event', 'event')
			.leftJoinAndSelect('event.eventType', 'eventType')
			.leftJoinAndSelect('studentEvent.justifications', 'justifications') // Join con la tabla justifications
			.where('profile.code = :code', { code: profileCode })
			.getOne();

		if (!student) {
			throw new NotFoundException('Student not found');
		}

		return student.studentEvent; // Retornamos solo los eventos
	}
}
