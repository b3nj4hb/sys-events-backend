import { Controller, Get, Post, Put, Body, UseInterceptors, UploadedFile, Delete, Param, UseGuards, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from '../services/event.service';
import { EventEntity } from '../entities/event.entity';
import { EventDto } from '../dto/event.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventTypeEntity } from '../entities/event-type.entity';
import { eventTypesExample } from 'src/examples/event-types.example';
import { eventWithStudentsExample } from 'src/examples/event-with-students.example';
import { EventUpdateDto } from '../dto/event-update.dto';
import { eventsByProfileCode } from 'src/examples/events-by-profile-code';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@UseGuards(JwtAuthGuard)
	@Get('')
	@ApiTags('Event')
	@ApiOperation({ summary: 'Retrieve events with associated event types' })
	@ApiResponse({
		status: 200,
		description: 'Successfully retrieved the list of events with associated event types',
		example: {
			'application/json': eventWithStudentsExample,
		},
	})
	async getEventsWithStudents() {
		return this.eventService.getEvents();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	@ApiTags('Event')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the event to retrieve',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: 'Get an event by ID' })
	@ApiResponse({
		status: 200,
		description: 'Successfully retrieved the event',
	})
	async getEventById(@Param('id') eventId: string): Promise<any> {
		return this.eventService.getEventById(eventId);
	}

	@UseGuards(JwtAuthGuard)
	@Post('create-event')
	@ApiTags('Event')
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Create a new event' })
	async create(@Body() createEventDto: EventDto, @UploadedFile() file: Express.Multer.File): Promise<EventEntity> {
		return this.eventService.createEvent({ ...createEventDto, file });
	}

	@UseGuards(JwtAuthGuard)
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
	async update(@Param('id') id: string, @Body() updateEventDto: EventUpdateDto, @UploadedFile() file: Express.Multer.File): Promise<EventEntity> {
		return this.eventService.updateEvent({ ...updateEventDto, id, file });
	}

	@UseGuards(JwtAuthGuard)
	@Delete('file/:id')
	@ApiTags('Event File')
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

	@UseGuards(JwtAuthGuard)
	@Patch('logical-delete/:id')
	@ApiTags('Event')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the event to delete',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: 'Delete an event' })
	async logicalEventDelete(@Param('id') eventId: string): Promise<void> {
		return this.eventService.logicalEventDelete(eventId);
	}

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
	@Get('types/list')
	@ApiTags('Event Type')
	@ApiOperation({ summary: 'Get all event types' })
	@ApiResponse({
		status: 200,
		description: 'Successfully retrieved the list of event types',
		example: {
			'application/json': eventTypesExample,
		},
	})
	async getEventTypes(): Promise<EventTypeEntity[]> {
		return this.eventService.getEventTypes();
	}

	@UseGuards(JwtAuthGuard)
	@Get('events-by-profile-code/:profileCode')
	@ApiTags('Event')
	@ApiOperation({ summary: "Retrieve student's events by profile code" })
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved the list of student's events by profile code",
		example: {
			'application/json': eventsByProfileCode,
		},
	})
	async getStudentEventsByProfileCode(@Param('profileCode') profileCode: string) {
		return this.eventService.getStudentEventsByProfileCode(profileCode);
	}
}
