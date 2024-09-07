// src/dto/event.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsUUID, IsOptional } from 'class-validator';
import { Express } from 'express';

export class EventDto {
	@IsOptional() // Solo para actualizaciones, no es obligatorio al crear
	@IsUUID()
	id?: string; // ID del evento a actualizar (opcional para creación)

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

	@IsOptional()
	@IsString()
	fileId?: string; // Opcional para ambos, solo se usa si hay un archivo

	@IsOptional()
	@IsString()
	fileUrl?: string; // Opcional para ambos, solo se usa si hay un archivo

	@IsOptional()
	file?: Express.Multer.File; // Archivo opcional
}
