import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@CreateDateColumn({
		type: 'timestamp',
		name: 'createdAt',
	})
	created_at: Date;
	@CreateDateColumn({
		type: 'timestamp',
		name: 'updatedAt',
	})
	updated_at: Date;
}
