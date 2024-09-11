import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEventEntity } from '../entities/student-event.entity';
import { Repository } from 'typeorm';
import { StudentEventDto } from '../dto/student-event.dto';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';

@Injectable()
export class StudentEventService {
  constructor(
		@InjectRepository(StudentEventEntity)
		private readonly studentEventRepository: Repository<StudentEventEntity>,

		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,

    @InjectRepository(EventEntity)
		private readonly eventRepository: Repository<EventEntity>,
	) {}

	async createStudentEvent(createStudentEventDto: StudentEventDto): Promise<StudentEventEntity> {
		const { assistante, studentId, eventId } = createStudentEventDto;

		// Buscar el estudiante por su ID
		const student = await this.studentRepository.findOne({
			where: { id: studentId },
		});

		if (!student) {
			throw new NotFoundException(`Event type with name "${studentId}" not found`);
		}

    // Buscar el evento por su ID
		const event = await this.eventRepository.findOne({
			where: { id: eventId },
		});

		if (!event) {
			throw new NotFoundException(`Event type with name "${eventId}" not found`);
		}

		// Crear un nuevo studiante-evento con los datos proporcionados
		const studentEvent = this.studentEventRepository.create({
			assistante,
			event,
			student
		});

		// Guardar el StudentEvent en la base de datos
		return this.studentEventRepository.save(event);
	}

	// Método para actualizar un student - evento existente
	async updateStudentEvent(updateStudentEventDto: StudentEventDto): Promise<StudentEventEntity> {
		const { id, assistante, studentId, eventId } = updateStudentEventDto;

		// Buscar el StudentEvent por su ID
		const studentEvent = await this.studentEventRepository.findOne({ where: { id } });

		if (!studentEvent) {
			throw new NotFoundException(`StudentEvent with ID "${id}" not found`);
		}

    // Buscar el evento por su ID
		const event = await this.eventRepository.findOne({ where: { id } });

		if (!event) {
			throw new NotFoundException(`Event with ID "${id}" not found`);
		}

		// Buscar el studiante por su ID
		const student = await this.studentRepository.findOne({
			where: { id: studentId },
		});

		if (!student) {
			throw new NotFoundException(`Event type with ID "${studentId}" not found`);
		}

		// Actualizar los campos del StudentEvent
		if (assistante) studentEvent.assistante = assistante;
		if (student) studentEvent.studentId = studentId;
		if (event) studentEvent.eventId = eventId;
		

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

	
}
