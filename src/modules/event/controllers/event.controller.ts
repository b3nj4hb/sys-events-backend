import { Controller, Get, Post, Put, Body, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
	@Post('create-event')
	@UseInterceptors(FileInterceptor('file'))
	async create(@Body() createEventDto: CreateEventDto, @UploadedFile() file: Express.Multer.File): Promise<EventEntity> {
		return this.eventService.createEvent(createEventDto, file);
	}
	@Put('update-event')
	async update(@Body() updateEventDto: UpdateEventDto): Promise<EventEntity> {
		return this.eventService.updateEvent(updateEventDto);
	}
	@Delete('file/:id')
	async deleteFile(@Param('id') eventId: string): Promise<void> {
		return this.eventService.deleteFile(eventId);
	}
}
