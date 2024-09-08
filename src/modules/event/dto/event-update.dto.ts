// src/dto/event.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsUUID, IsOptional } from 'class-validator';
import { Express } from 'express';

export class EventUpdateDto {
	@IsOptional()
	@IsUUID()
	id?: string;

	@ApiProperty({
		description: 'Name of the event',
		example: 'Actívate Sistemas',
	})
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Date of the event',
		example: '2024-09-25',
	})
	@IsOptional()
	@IsDateString()
	date: string;

	@ApiProperty({
		description: 'Hour of the event',
		example: '18:00',
	})
	@IsOptional()
	@IsString()
	hour: string;

	@ApiProperty({
		description: 'Location of the event',
		example: 'Canchas sintéticas de la UPeU',
	})
	@IsOptional()
	@IsString()
	location: string;

	@ApiProperty({
		description: 'Period of the event',
		example: '2024-2',
	})
	@IsOptional()
	@IsString()
	period: string;

	@ApiProperty({
		description: 'ID of the event type',
		example: 'b1e33e06-f1d0-4a58-8cd7-36284179a60d',
	})
	@IsNotEmpty()
	@IsOptional()
	@IsUUID()
	eventTypeId: string; // ID del tipo de evento

	@IsOptional()
	@IsString()
	fileId?: string; // Opcional para ambos, solo se usa si hay un archivo

	@IsOptional()
	@IsString()
	fileUrl?: string; // Opcional para ambos, solo se usa si hay un archivo

	@ApiProperty({
		description: 'File to be uploaded',
		type: 'string',
		format: 'binary',
		required: false,
	})
	@IsOptional()
	file?: Express.Multer.File; // Archivo opcional
}
