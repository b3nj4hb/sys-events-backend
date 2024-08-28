import { BaseEntity } from 'src/config/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { CarrierEntity } from 'src/modules/carrier/entities/carrier.entity';
import { CycleEntity } from './cycle.entity';

@Entity({ name: 'student' })
export class StudentEntity extends BaseEntity {
	@ManyToOne(() => ProfileEntity, (profile) => profile.student)
	profile: ProfileEntity;
	@ManyToOne(() => CarrierEntity, (carrier) => carrier.student)
	carrier: CarrierEntity;
	@ManyToOne(() => CycleEntity, (cycle) => cycle.student)
	cycle: CycleEntity;
}
