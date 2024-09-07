import { Controller, Get, Post, Put, Body, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from '../services/event.service';
import { EventEntity } from '../entities/event.entity';
import { EventDto } from '../dto/event.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventTypeEntity } from '../entities/event-type.entity';

@Controller('Event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('with-students')
	@ApiTags('Event')
	@ApiOperation({ summary: "Retrieve events with the student's attendance status" })
	async getEventsWithStudents() {
		return this.eventService.getEventsWithStudents();
	}

	@Post('create-event')
	@ApiTags('Event')
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Create a new event' })
	async create(@Body() createEventDto: EventDto, @UploadedFile() file: Express.Multer.File): Promise<EventEntity> {
		return this.eventService.createEvent({ ...createEventDto, file });
	}

	@Put(':id')
	@ApiTags('Event')
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
	@ApiTags('Event')
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
	@ApiTags('Event')
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

	@Get('types')
	@ApiTags('Event Type')
	@ApiOperation({ summary: 'Get all event types' })
	@ApiResponse({
		status: 200,
		description: 'Successfully retrieved the list of event types',
		type: [EventTypeEntity], // Puedes usar el DTO aquí si has creado uno
	})
	async getEventTypes(): Promise<EventTypeEntity[]> {
		return this.eventService.getEventTypes();
	}
}
