import { BaseEntity } from 'src/config/base.entity';
import { Cycle } from '../interfaces/cycle.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity({ name: 'cycle' })
export class CycleEntity extends BaseEntity implements Cycle {
	@Column()
	name: string;
	@OneToMany(() => StudentEntity, (student) => student.cycle)
	student: StudentEntity[];
}
