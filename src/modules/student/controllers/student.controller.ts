import { Controller, Get } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Get('with-events')
	@ApiOperation({ summary: "Retrieve student's with the events attendance status" })
	async getStudentsWithEvents() {
		return this.studentService.getStudentsWithEvents();
	}
}
