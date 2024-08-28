import { BaseEntity } from 'src/config/base.entity';
import { Carrier } from '../interfaces/carrier.interface';
import { Column, Entity, ManyToOne } from 'typeorm';
import { FacultyEntity } from './faculty.entity';

@Entity({ name: 'carrier' })
export class CarrierEntity extends BaseEntity implements Carrier {
	@Column()
	name: string;
	@ManyToOne(() => FacultyEntity, (faculty) => faculty.carrier)
	faculty: FacultyEntity;
}
