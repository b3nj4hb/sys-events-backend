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
			.select([
				'student.id', // ID del estudiante
				'profile.id', // ID del profile
				'profile.fullName', // Nombre completo del perfil
				'profile.avatarUrl', // URL avatar del perfil
				'profile.code', // Codigo del perfil
				'profile.phone', // Numero de telefono
				'profile.email', // Email del perfil
				'role.name', // Nombre del rol
				'carrier.name', // Nombre de la carrera
				'faculty.name', // Nombre de la facultad
				'studentEvent.assistante', // Asistencia al evento
				'event.name', // Nombre del evento
				'event.date', // Fecha del evento
				'event.hour', // Hora del evento
				'event.location', // Ubicación del evento
				'event.period', // Periodo del evento
				'eventType.name', // Tipo de evento
			])
			.getMany();
	}
}
