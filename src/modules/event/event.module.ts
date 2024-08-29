import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';

@Module({
	controllers: [EventController],
	providers: [EventService],
	imports: [TypeOrmModule.forFeature([EventEntity])],
})
export class EventModule {}
