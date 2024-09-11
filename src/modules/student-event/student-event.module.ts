import { Module } from '@nestjs/common';
import { StudentEventController } from './controllers/student-event.controller';
import { StudentEventService } from './services/student-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEventEntity } from './entities/student-event.entity';
import { EventEntity } from '../event/entities/event.entity';
import { StudentEntity } from '../student/entities/student.entity';

@Module({
	controllers: [StudentEventController],
	providers: [StudentEventService],
	imports: [TypeOrmModule.forFeature([StudentEventEntity, EventEntity, StudentEntity])],
})
export class StudentEventModule {}
