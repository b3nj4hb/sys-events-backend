import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class StudentEventUpdateDto {
	@IsOptional()
	@IsUUID()
	id?: string;

	@ApiProperty({
		description: 'Assistance of students in events ',
		example: false,
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
		description: 'Code of the student',
		example: '202010352',
	})
	@IsString()
	@IsOptional()
	studentCode: string; // ID del student
}
