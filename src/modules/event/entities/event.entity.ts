import { BaseEntity } from 'src/config/base.entity';
import { Event } from '../interfaces/event.interface';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EventTypeEntity } from './event-type.entity';
import { StudentEventEntity } from 'src/modules/student-event/entities/student-event.entity';

@Entity({ name: 'event' })
export class EventEntity extends BaseEntity implements Event {
	@Column()
	name: string;
	@Column('date')
	date: string;
	@Column('time')
	hour: string;
	@Column()
	location: string;
	@Column()
	period: string;
	@Column({ nullable: true })
	fileId: string;
	@Column({ nullable: true })
	fileUrl: string;

	@ManyToOne(() => EventTypeEntity, (eventType) => eventType.event)
	eventType: EventTypeEntity;
	@OneToMany(() => StudentEventEntity, (studentEvent) => studentEvent.event)
	studentEvent: StudentEventEntity[];
}
