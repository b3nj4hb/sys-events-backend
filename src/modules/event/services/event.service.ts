import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { EventTypeEntity } from '../entities/event-type.entity'; // Importa la entidad EventType
import { CreateEventDto } from '../dto/create-event.dto'; // Asegúrate de tener el DTO creado
import { UpdateEventDto } from '../dto/update-event.dto';

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

  async createEvent(createEventDto: CreateEventDto): Promise<EventEntity> {
    const { name, date, hour, location, period, eventTypeId } = createEventDto;

    // Buscar el tipo de evento por su ID
    const eventType = await this.eventTypeRepository.findOne({ where: { id: eventTypeId } });

    //const eventType = await this.eventTypeRepository.findOne({ where: { name: eventTypeName } });

    /*if (!eventType) {
      throw new NotFoundException('Event type not found');
    }*/
    if (!eventType) {
      throw new NotFoundException(`Event type with name "${eventTypeId}" not found`);
    }

    // Crear un nuevo evento con los datos proporcionados
    const event = this.eventRepository.create({
      name,
      date,
      hour,
      location,
      period,
      eventType, // Asocia el tipo de evento encontrado
    });

    // Guardar el evento en la base de datos
    return this.eventRepository.save(event);
  }

  
   // Método para actualizar un evento existente
   async updateEvent(updateEventDto: UpdateEventDto): Promise<EventEntity> {
    const { id, name, date, hour, location, period, eventTypeId } = updateEventDto;

    // Buscar el evento por su ID
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    // Buscar el tipo de evento por su ID
    const eventType = await this.eventTypeRepository.findOne({ where: { id: eventTypeId } });

    if (!eventType) {
      throw new NotFoundException(`Event type with ID "${eventTypeId}" not found`);
    }

    // Actualizar los campos del evento
    event.name = name;
    event.date = date;
    event.hour = hour;
    event.location = location;
    event.period = period;
    event.eventType = eventType;

    // Guardar los cambios en la base de datos
    return this.eventRepository.save(event);
  }

}


