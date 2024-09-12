import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class StudentEventDto {
	@ApiProperty({
		description: 'Assistance of students in events ',
		example: 'True or false',
	})
	@IsNotEmpty()
	@IsBoolean()
	assistance: boolean;

	@ApiProperty({
		description: 'ID of the event',
		example: 'b1e33e06-f1d0-4a58-8cd7-36284179a60d',
	})
	@IsNotEmpty()
	@IsUUID()
	eventId: string; // ID del evento

	@ApiProperty({
		description: 'ID of the student',
		example: 'b1e33e06-f1d0-4a58-8cd7-36284179a60d',
	})
	@IsNotEmpty()
	@IsString()
	studentCode: string; // Código del estudiante
}
