import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(EventEntity)
		private readonly eventRepository: Repository<EventEntity>,
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
}
