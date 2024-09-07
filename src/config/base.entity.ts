import { ApiProperty } from '@nestjs/swagger';
import { STATES } from '../constants/states';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({
		description: 'Unique identifier',
		example: 'd643374a-96b9-42e6-9e3a-451471481f99',
	})
	id: string;
	@CreateDateColumn({
		type: 'timestamp',
		name: 'createdAt',
	})
	@ApiProperty({
		description: 'Creation timestamp',
		example: '2024-09-08T00:16:04.287Z',
	})
	created_at: Date;
	@CreateDateColumn({
		type: 'timestamp',
		name: 'updatedAt',
	})
	@ApiProperty({
		description: 'Last update timestamp',
		example: '2024-09-08T00:16:04.287Z',
	})
	updated_at: Date;
	@Column({
		type: 'enum',
		enum: STATES,
		default: STATES.Active,
		name: 'state',
	})
	@ApiProperty({
		description: 'State',
		example: 'active',
	})
	state!: STATES;
}
