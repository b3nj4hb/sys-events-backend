import { BaseEntity } from 'src/config/base.entity';
import { Profile } from '../interfaces/profile.interface';
import { Column, Entity } from 'typeorm';

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
}
