import { BaseEntity } from 'src/config/base.entity';
import { StudentEvent } from '../interfaces/student-event.interface';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';
import { JustificationEntity } from './justification.entity';

@Entity({ name: 'studentEvent' })
export class StudentEventEntity extends BaseEntity implements StudentEvent {
	@Column({ type: 'boolean' })
	assistance: boolean;

	@Column()
	studentId: string;

	@Column()
	eventId: string;

	@ManyToOne(() => StudentEntity, (student) => student.studentEvent)
	student: StudentEntity;
	@ManyToOne(() => EventEntity, (event) => event.studentEvent)
	event: EventEntity;
	@OneToMany(() => JustificationEntity, (justification) => justification.studentEvent)
	justifications: JustificationEntity[];
}
