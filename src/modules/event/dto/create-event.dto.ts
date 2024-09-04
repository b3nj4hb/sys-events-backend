// src/dto/create-event.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  eventTypeName: string;

  @IsNotEmpty()
  @IsUUID()
  eventTypeId: string; // ID del tipo de evento
}
