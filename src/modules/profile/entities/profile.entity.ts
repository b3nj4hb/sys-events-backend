import { BaseEntity } from 'src/config/base.entity';
import { Profile } from '../interfaces/profile.interface';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { StudentEntity } from 'src/modules/student/entities/student.entity';

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

	@OneToOne(() => StudentEntity, (student) => student.profile)
	student: StudentEntity;
	@ManyToOne(() => RoleEntity, (role) => role.profile)
	role: RoleEntity;
}
