import { Controller, Get } from '@nestjs/common';
import { EventService } from '../services/event.service';

@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('with-students')
	async getEventsWithStudents() {
		return this.eventService.getEventsWithStudents();
	}
}
