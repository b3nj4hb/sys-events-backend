import { Controller, Get, Post,Put, Body } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventEntity } from '../entities/event.entity';
import { UpdateEventDto } from '../dto/update-event.dto';

@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('with-students')
	async getEventsWithStudents() {
		return this.eventService.getEventsWithStudents();
	}
  @Post('create-student')
  async create(@Body() createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventService.createEvent(createEventDto);
  }
  @Put('update-student')
  async update(@Body() updateEventDto: UpdateEventDto): Promise<EventEntity> {
    return this.eventService.updateEvent(updateEventDto);
  }
}
