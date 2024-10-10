import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { studentWithEventsExample } from 'src/examples/student-with-events.example';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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

	@UseGuards(JwtAuthGuard)
	@Post('import-students')
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Import students from CSV file' })
	@ApiResponse({
		status: 201,
		description: 'Students successfully imported from CSV file',
	})
	async importStudentsFromCSV(@UploadedFile() file: Express.Multer.File): Promise<void> {
		if (!file) {
			throw new BadRequestException('No file uploaded');
		}
		return this.studentService.importStudentsFromCSV(file);
	}
}
