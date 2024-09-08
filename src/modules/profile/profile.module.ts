import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { RoleEntity } from './entities/role.entity';
import { StudentEntity } from '../student/entities/student.entity';
import { IsStudentRequiredConstraint } from './validation/is-student-required-constraint';

@Module({
	controllers: [ProfileController],
	providers: [ProfileService, IsStudentRequiredConstraint],
	imports: [TypeOrmModule.forFeature([ProfileEntity, RoleEntity, StudentEntity])],
})
export class ProfileModule {}
