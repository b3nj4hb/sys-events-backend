import { BaseEntity } from 'src/config/base.entity';
import { EventType } from '../interfaces/event-type.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { EventEntity } from './event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'eventType' })
export class EventTypeEntity extends BaseEntity implements EventType {
	@Column()
	name: string;

	@OneToMany(() => EventEntity, (event) => event.eventType)
	event: EventEntity[];
}
