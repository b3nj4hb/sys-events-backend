import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventTypeEntity } from './entities/event-type.entity';
import { StudentEntity } from '../student/entities/student.entity';
import { CarrierEntity } from '../carrier/entities/carrier.entity';
import { StudentEventEntity } from '../student-event/entities/student-event.entity';

@Module({
	controllers: [EventController],
	providers: [EventService],
	imports: [TypeOrmModule.forFeature([EventEntity, EventTypeEntity, StudentEntity, CarrierEntity, StudentEventEntity])],
})
export class EventModule {}
