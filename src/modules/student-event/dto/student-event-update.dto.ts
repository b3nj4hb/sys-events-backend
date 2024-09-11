import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class StudentEventUpdateDto {
	@IsOptional()
	@IsUUID()
	id?: string;

	@ApiProperty({
		description: 'Assistance of students in events ',
		example: 'True or false',
	})
	@IsNotEmpty()
	@IsBoolean()
	@IsOptional()
	assistance: boolean;

	@ApiProperty({
		description: 'ID of the event',
		example: 'b1e33e06-f1d0-4a58-8cd7-36284179a60d',
	})
	@IsUUID()
	@IsOptional()
	eventId: string; // ID del evento

	@ApiProperty({
		description: 'ID of the student',
		example: 'b1e33e06-f1d0-4a58-8cd7-36284179a60d',
	})
	@IsUUID()
	@IsOptional()
	studentId: string; // ID del student
}
