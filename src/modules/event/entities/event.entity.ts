import { BaseEntity } from 'src/config/base.entity';
import { Event } from '../interfaces/event.interface';
import { Column, Entity, ManyToOne } from 'typeorm';
import { EventTypeEntity } from './event-type.entity';

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

	@ManyToOne(() => EventTypeEntity, (eventType) => eventType.event)
	eventType: EventTypeEntity;
}
