import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEventEntity } from '../entities/student-event.entity';
import { Repository } from 'typeorm';
import { StudentEventDto } from '../dto/student-event.dto';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';
import { StudentEventUpdateDto } from '../dto/student-event-update.dto';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { JustificationEntity } from '../entities/justification.entity';

@Injectable()
export class StudentEventService {
	constructor(
		@InjectRepository(StudentEventEntity)
		private readonly studentEventRepository: Repository<StudentEventEntity>,

		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,

		@InjectRepository(EventEntity)
		private readonly eventRepository: Repository<EventEntity>,

		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,

		@InjectRepository(JustificationEntity)
		private readonly justificationRepository: Repository<JustificationEntity>,
	) {}

	async createStudentEvent(createStudentEventDto: StudentEventDto): Promise<StudentEventEntity> {
		const { assistance, studentCode, eventId } = createStudentEventDto;

		// Buscar el perfil del estudiante por su código
		const profile = await this.profileRepository.findOne({
			where: { code: studentCode },
			relations: ['student'],
		});

		if (!profile) {
			throw new NotFoundException(`Student with code "${studentCode}" not found`);
		}

		if (!profile.student) {
			throw new NotFoundException(`Student associated with profile code "${studentCode}" not found`);
		}

		// Buscar el evento por su ID
		const event = await this.eventRepository.findOne({
			where: { id: eventId },
		});

		if (!event) {
			throw new NotFoundException(`Event with ID "${eventId}" not found`);
		}

		// Crear un nuevo studiante-evento con los datos proporcionados
		const studentEvent = this.studentEventRepository.create({
			assistance,
			event,
			student: profile.student,
		});

		// Guardar el StudentEvent en la base de datos
		return this.studentEventRepository.save(studentEvent);
	}

	// Método para actualizar un student - evento existente
	async updateStudentEvent(updateStudentEventDto: StudentEventUpdateDto): Promise<StudentEventEntity> {
		const { id, assistance, studentCode, eventId } = updateStudentEventDto;

		// Buscar el StudentEvent por su ID
		const studentEvent = await this.studentEventRepository.findOne({ where: { id } });

		if (!studentEvent) {
			throw new NotFoundException(`StudentEvent with ID "${id}" not found`);
		}

		// Buscar el evento por su ID
		const event = await this.eventRepository.findOne({ where: { id: eventId } });

		if (!event) {
			throw new NotFoundException(`Event with ID "${eventId}" not found`);
		}

		// Buscar el perfil del estudiante por su código
		const profile = await this.profileRepository.findOne({
			where: { code: studentCode },
			relations: ['student'],
		});

		if (!profile) {
			throw new NotFoundException(`Profile with code "${studentCode}" not found`);
		}

		if (!profile.student) {
			throw new NotFoundException(`Student associated with profile code "${studentCode}" not found`);
		}

		// Actualizar los campos del StudentEvent
		studentEvent.assistance = assistance;
		if (profile.student) studentEvent.student = profile.student;
		if (event) studentEvent.event = event;

		// Guardar los cambios en la base de datos
		return this.studentEventRepository.save(studentEvent);
	}

	async deleteStudentEvent(studentEventId: string): Promise<void> {
		// Buscar el StudentEvent por ID
		const studentEvent = await this.studentEventRepository.findOne({
			where: { id: studentEventId },
		});

		if (!studentEvent) {
			throw new NotFoundException(`Event with ID "${studentEventId}" not found`);
		}

		// Eliminar el StudentEvent de la base de datos
		await this.studentEventRepository.remove(studentEvent);
	}

	async createJustification(idStudentEvent: string): Promise<JustificationEntity> {
		// Buscar el studentEvent por su ID
		const studentEvent = await this.studentEventRepository
			.createQueryBuilder('studentEvent')
			.leftJoinAndSelect('studentEvent.justifications', 'justifications')
			.where('studentEvent.id = :id', { id: idStudentEvent })
			.getOne();

		if (!studentEvent) {
			throw new NotFoundException(`StudentEvent with ID "${idStudentEvent}" not found`);
		}

		// Validar si ya tiene una justificación pendiente o aprobada
		const hasPendingOrApprovedJustification = studentEvent.justifications.some((justification) => justification.status === 'pending' || justification.status === 'approved');

		if (hasPendingOrApprovedJustification) {
			throw new NotFoundException('You already have a pending or approved justification');
		}

		// Validar si puede mandar una justificación
		if (!studentEvent.assistance || studentEvent.justifications.some((justification) => justification.status === 'rejected')) {
			const justification = this.justificationRepository.create({
				studentEvent: studentEvent,
				status: 'pending', // Estado inicial de la justificación
			});

			return this.justificationRepository.save(justification);
		} else {
			throw new Error('You cannot send a justification');
		}
	}
}
