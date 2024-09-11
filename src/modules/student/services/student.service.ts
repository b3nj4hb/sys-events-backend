import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
	) {}

	async getStudentsWithEvents(): Promise<any> {
		return this.studentRepository
			.createQueryBuilder('student')
			.leftJoinAndSelect('student.profile', 'profile')
			.leftJoinAndSelect('profile.role', 'role') // Join con la tabla role a través de profile
			.leftJoinAndSelect('student.carrier', 'carrier')
			.leftJoinAndSelect('carrier.faculty', 'faculty')
			.leftJoinAndSelect('student.studentEvent', 'studentEvent')
			.leftJoinAndSelect('studentEvent.event', 'event')
			.leftJoinAndSelect('event.eventType', 'eventType')
			.leftJoinAndSelect('student.cycle', 'cycle') // Join con la tabla cycle a través de student
			.select([
				// Datos del estudiante y sus subclases
				'student.id', // ID del estudiante
				'profile.id', // ID del profile
				'profile.fullName', // Nombre completo del perfil
				'profile.avatarUrl', // URL avatar del perfil
				'profile.code', // Codigo del perfil
				'profile.phone', // Numero de telefono
				'profile.email', // Email del perfil

				// Datos del rol asociado al perfil
				'role.name', // Nombre del rol

				// Datos de la carrera y facultad asociada
				'carrier.name', // Nombre de la carrera
				'faculty.name', // Nombre de la facultad

				// Datos del ciclo asociado
				'cycle.name',

				// Datos del studentEvent
				'studentEvent.assistance', // Asistencia al evento

				// Datos del evento
				'event.name', // Nombre del evento
				'event.date', // Fecha del evento
				'event.hour', // Hora del evento
				'event.location', // Ubicación del evento
				'event.period', // Periodo del evento
				'eventType.name', // Tipo de evento
				'event.fileUrl',
			])
			.getMany();
	}
}
