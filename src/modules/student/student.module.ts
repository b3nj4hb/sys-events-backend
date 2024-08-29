import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';

@Module({
	controllers: [StudentController],
	providers: [StudentService],
	imports: [TypeOrmModule.forFeature([StudentEntity])],
})
export class StudentModule {}
