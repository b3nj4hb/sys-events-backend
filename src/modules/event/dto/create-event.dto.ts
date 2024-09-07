// src/dto/create-event.dto.ts
import {
	IsString,
	IsNotEmpty,
	IsDateString,
	IsUUID,
	IsOptional,
} from 'class-validator';

export class CreateEventDto {
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

	// @IsNotEmpty()
	// @IsString()
	// eventTypeName: string;

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
