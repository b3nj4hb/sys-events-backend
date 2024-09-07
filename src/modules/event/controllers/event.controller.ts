import { Controller, Get, Post, Put, Body, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from '../services/event.service';
import { EventEntity } from '../entities/event.entity';
import { EventDto } from '../dto/event.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('with-students')
	@ApiOperation({ summary: "Retrieve events with the student's attendance status" })
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
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the event to update',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: 'Update an event' })
	async update(@Param('id') id: string, @Body() updateEventDto: EventDto, @UploadedFile() file: Express.Multer.File): Promise<EventEntity> {
		return this.eventService.updateEvent({ ...updateEventDto, id, file });
	}

	@Delete('file/:id')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the event you want to delete the file from',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: 'Delete a file associated with an event' })
	async deleteFile(@Param('id') eventId: string): Promise<void> {
		return this.eventService.deleteFile(eventId);
	}

	@Delete(':id')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the event to delete',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: 'Delete an event' })
	async deleteEvent(@Param('id') eventId: string): Promise<void> {
		return this.eventService.deleteEvent(eventId);
	}
}
