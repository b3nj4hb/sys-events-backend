import { BaseEntity } from 'src/config/base.entity';
import { Carrier } from '../interfaces/carrier.interface';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { FacultyEntity } from './faculty.entity';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';

@Entity({ name: 'carrier' })
export class CarrierEntity extends BaseEntity implements Carrier {
	@Column()
	name: string;
	@ManyToOne(() => FacultyEntity, (faculty) => faculty.carrier)
	faculty: FacultyEntity;
	@OneToMany(() => StudentEntity, (student) => student.carrier)
	student: StudentEntity[];
	@OneToMany(() => EventEntity, (event) => event.carrier)
	events: EventEntity[];
}
