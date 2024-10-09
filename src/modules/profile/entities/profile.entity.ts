import { BaseEntity } from 'src/config/base.entity';
import { Profile } from '../interfaces/profile.interface';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { Status } from 'src/constants/states';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity implements Profile {
	@Column()
	fullName: string;
	@Column()
	avatarUrl: string;
	@Column({ unique: true })
	code: string;
	@Column({ nullable: true })
	phone: string;
	@Column()
	email: string;
	@Column()
	password: string;
	@Column({ type: 'enum', enum: ['unique', 'one', 'two', 'three'], default: 'unique' })
	group: 'unique' | 'one' | 'two' | 'three';
	@Column({ type: 'enum', enum: ['lima', 'tarapoto', 'juliaca'], default: 'lima' })
	campus: 'lima' | 'tarapoto' | 'juliaca';

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.ACTIVE,
	})
	status: Status;

	@OneToOne(() => StudentEntity, (student) => student.profile)
	student: StudentEntity;
	@ManyToOne(() => RoleEntity, (role) => role.profile)
	role: RoleEntity;
}
