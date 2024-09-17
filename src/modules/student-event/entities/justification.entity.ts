import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StudentEventEntity } from './student-event.entity';

@Entity({ name: 'justification' })
export class JustificationEntity extends BaseEntity {
	@Column({ type: 'text' })
	reason: string;
	@Column({ type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' })
	status: 'pending' | 'approved' | 'rejected';
	@Column({ nullable: true })
	fileId: string;
	@Column({ nullable: true })
	fileUrl: string;

	@ManyToOne(() => StudentEventEntity, (studentEvent) => studentEvent.justifications)
	studentEvent: StudentEventEntity;
}
