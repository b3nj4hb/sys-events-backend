import { BaseEntity } from 'src/config/base.entity';
import { Role } from '../interfaces/role.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity implements Role {
	@Column()
	name: string;
	@OneToMany(() => ProfileEntity, (profile) => profile.role)
	profile: ProfileEntity[];
}
