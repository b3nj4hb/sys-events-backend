import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentEntity } from '../entities/student.entity';
import { studentWithEventsExample } from 'src/examples/student-with-events.example';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@ApiTags('Student')
@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@UseGuards(JwtAuthGuard)
	@Get('with-events')
	@ApiOperation({ summary: "Retrieve student's with the events attendance status" })
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved the list of student's with the events attendance status",
		example: {
			'application/json': studentWithEventsExample,
		},
	})
	async getStudentsWithEvents() {
		return this.studentService.getStudentsWithEvents();
	}
}
