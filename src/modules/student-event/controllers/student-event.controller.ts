import { Body, Controller, Delete, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { StudentEventDto } from '../dto/student-event.dto';
import { StudentEventEntity } from '../entities/student-event.entity';
import { StudentEventService } from '../services/student-event.service';
import { StudentEventUpdateDto } from '../dto/student-event-update.dto';
import { JustificationEntity } from '../entities/justification.entity';
import { JustificationDto } from '../dto/justificacion.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('student-event')
export class StudentEventController {
	constructor(private readonly studentEventService: StudentEventService) {}

	@ApiTags('Student Event')
	@Post('create')
	@ApiOperation({ summary: "Register a student's attendance for an event", description: 'Update the attendance details for a student at a specific event.' })
	async create(@Body() createStudentEventDto: StudentEventDto): Promise<StudentEventEntity> {
		// console.log('Creating StudentEvent with DTO:', createStudentEventDto);
		return this.studentEventService.createStudentEvent({ ...createStudentEventDto });
	}

	@ApiTags('Student Event')
	@Put(':id')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the attendance record to update',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: "Update a student's attendance record" })
	async update(@Param('id') id: string, @Body() updateStudentEventDto: StudentEventUpdateDto): Promise<StudentEventEntity> {
		// console.log('Updating StudentEvent with DTO:', updateStudentEventDto);
		return this.studentEventService.updateStudentEvent({ ...updateStudentEventDto, id });
	}

	@ApiTags('Student Event')
	@Delete(':id')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the attendance record to delete',
		example: '7b4ffd79-0c1d-4670-8e47-b21168e3187b',
	})
	@ApiOperation({ summary: "Delete a student's attendance record", description: "Remove a record of a student's attendance at a specific event." })
	async deleteStudentEvent(@Param('id') studentEventId: string): Promise<void> {
		return this.studentEventService.deleteStudentEvent(studentEventId);
	}

	@ApiTags('Justification')
	@Post('justification')
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: "Create a justification for a student's attendance record" })
	async createJustification(@Body() justificationDto: JustificationDto, @UploadedFile() file: Express.Multer.File): Promise<JustificationEntity> {
		return this.studentEventService.createJustification({ ...justificationDto, file });
	}
}
