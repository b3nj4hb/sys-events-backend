import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class StudentEventDto {
	@ApiProperty({
		description: 'Assistance of students in events ',
		example: true,
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
		description: 'Code of the student',
		example: '202010352',
	})
	@IsNotEmpty()
	@IsString()
	studentCode: string; // Código del estudiante
}
