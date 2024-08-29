import { Controller, Get } from '@nestjs/common';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Get('with-events')
	async getStudentsWithEvents() {
		return this.studentService.getStudentsWithEvents();
	}
}
