import { BaseEntity } from 'src/config/base.entity';
import { Faculty } from '../interfaces/faculty.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { CarrierEntity } from './carrier.entity';

@Entity({ name: 'faculty' })
export class FacultyEntity extends BaseEntity implements Faculty {
	@Column()
	name: string;
	@OneToMany(() => CarrierEntity, (carrier) => carrier.faculty)
	carrier: CarrierEntity[];
}
