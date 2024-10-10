import { BaseEntity } from 'src/config/base.entity';
import { Profile, Role } from '../interfaces/profile.interface';
import { Column, Entity, OneToOne } from 'typeorm';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { Status } from 'src/constants/states';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity implements Profile {
	@Column()
	fullName: string;
	@Column({ nullable: true })
	avatarUrl: string;
	@Column({ unique: true })
	code: string;
	@Column({ nullable: true })
	phone: string;
	@Column()
	email: string;
	@Column()
	password: string;
	@Column({ type: 'enum', enum: Role, default: Role.student })
	role: Role;
	@Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
	status: Status;

	@OneToOne(() => StudentEntity, (student) => student.profile)
	student: StudentEntity;
}
