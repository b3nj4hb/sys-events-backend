import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

export class JustificationDto {
	@ApiProperty({
		description: 'ID that references the attendance record of a specific event',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	@IsNotEmpty()
	@IsUUID()
	studentEventId: string;

	@ApiProperty({
		description: 'File to be uploaded',
		type: 'string',
		format: 'binary',
		required: false,
	})
	@IsOptional()
	file?: Express.Multer.File;

	@ApiProperty({
		description: 'Reason for the justification',
		example: 'Medical appointment',
		required: false,
	})
	@IsOptional()
	@IsString()
	reason?: string;
}
