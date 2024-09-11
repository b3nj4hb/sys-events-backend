import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { StudentEventDto } from '../dto/student-event.dto';
import { StudentEventEntity } from '../entities/student-event.entity';
import { StudentEventService } from '../services/student-event.service';

@Controller('student-event')
export class StudentEventController {
  constructor(private readonly studentEventService: StudentEventService) {}

	@Post('create-StudentEvent')
	@ApiTags('Event')
	@ApiOperation({ summary: 'Create a new Student - Event' })
	async create(@Body() createStudentEventDto: StudentEventDto,): Promise<StudentEventEntity> {
		return this.studentEventService.createStudentEvent({ ...createStudentEventDto });
	}

	@Put(':id')
	@ApiTags('StudentEvent')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the StudentEvent to update',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: 'Update an StudentEvent' })
	async update(@Param('id') id: string, @Body() updateStudentEventDto: StudentEventDto): Promise<StudentEventEntity> {
		return this.studentEventService.updateStudentEvent({ ...updateStudentEventDto, id });
	}
	
	@Delete(':id')
	@ApiTags('StudentEvent')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the StudentEvent to delete',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: 'Delete an StudentEvent' })
	async deleteStudentEvent(@Param('id') studentEventId: string): Promise<void> {
		return this.studentEventService.deleteStudentEvent(studentEventId);
	}

	
}
