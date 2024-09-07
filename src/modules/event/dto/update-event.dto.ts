// src/dto/update-event.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsUUID, IsOptional } from 'class-validator';

export class UpdateEventDto {
	@IsNotEmpty()
	@IsUUID()
	id: string; // ID del evento a actualizar

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsDateString()
	date: string;

	@IsNotEmpty()
	@IsString()
	hour: string;

	@IsNotEmpty()
	@IsString()
	location: string;

	@IsNotEmpty()
	@IsString()
	period: string;

	@IsNotEmpty()
	@IsUUID()
	eventTypeId: string; // ID del tipo de evento

	// Campos opcionales para el fileId y fileUrl
	@IsOptional()
	@IsString()
	fileId?: string;

	@IsOptional()
	@IsString()
	fileUrl?: string;

	@IsOptional()
	file?: Express.Multer.File; // Archivo opcional
}
