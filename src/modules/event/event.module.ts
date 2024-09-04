import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventTypeEntity } from './entities/event-type.entity';

@Module({
	controllers: [EventController],
	providers: [EventService],
	imports: [TypeOrmModule.forFeature([EventEntity, EventTypeEntity])],

})
export class EventModule {}
