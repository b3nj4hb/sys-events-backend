import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyEntity } from 'src/modules/carrier/entities/faculty.entity';
import { CycleEntity } from 'src/modules/student/entities/cycle.entity';
import { RoleEntity } from 'src/modules/profile/entities/role.entity';
import { EventTypeEntity } from 'src/modules/event/entities/event-type.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			CycleEntity,
			EventTypeEntity,
			FacultyEntity,
			RoleEntity,
		]),
	],
	providers: [SeedService],
})
export class SeedModule {}
