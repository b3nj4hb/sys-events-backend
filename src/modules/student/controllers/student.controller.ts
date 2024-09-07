import { Controller, Get } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentEntity } from '../entities/student.entity';
import { studentWithEventsExample } from 'src/examples/student-with-events.example';

@ApiTags('Student')
@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

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
