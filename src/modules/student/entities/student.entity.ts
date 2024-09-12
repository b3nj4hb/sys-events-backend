import { BaseEntity } from 'src/config/base.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { CarrierEntity } from 'src/modules/carrier/entities/carrier.entity';
import { CycleEntity } from './cycle.entity';
import { StudentEventEntity } from 'src/modules/student-event/entities/student-event.entity';

@Entity({ name: 'student' })
export class StudentEntity extends BaseEntity {
	@OneToOne(() => ProfileEntity, (profile) => profile.student)
	@JoinColumn()
	profile: ProfileEntity;
	@ManyToOne(() => CarrierEntity, (carrier) => carrier.student)
	carrier: CarrierEntity;
	@ManyToOne(() => CycleEntity, (cycle) => cycle.student)
	cycle: CycleEntity;
	@OneToMany(() => StudentEventEntity, (studentEvent) => studentEvent.student)
	studentEvent: StudentEventEntity[];
}
