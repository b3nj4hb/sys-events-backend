import { Controller, Get, Post, Put, Body, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from '../services/event.service';
import { EventEntity } from '../entities/event.entity';
import { EventDto } from '../dto/event.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('with-students')
	async getEventsWithStudents() {
		return this.eventService.getEventsWithStudents();
	}
	@Post('create-event')
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Create a new event' })
	async create(@Body() createEventDto: EventDto, @UploadedFile() file: Express.Multer.File): Promise<EventEntity> {
		return this.eventService.createEvent({ ...createEventDto, file });
	}
	@Put(':id')
	@UseInterceptors(FileInterceptor('file'))
	async update(@Param('id') id: string, @Body() updateEventDto: EventDto, @UploadedFile() file: Express.Multer.File): Promise<EventEntity> {
		return this.eventService.updateEvent({ ...updateEventDto, id, file });
	}
	@Delete('file/:id')
	async deleteFile(@Param('id') eventId: string): Promise<void> {
		return this.eventService.deleteFile(eventId);
	}
	@Delete(':id')
	async deleteEvent(@Param('id') eventId: string): Promise<void> {
		return this.eventService.deleteEvent(eventId);
	}
}
