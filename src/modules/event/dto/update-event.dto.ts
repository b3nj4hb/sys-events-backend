// src/dto/update-event.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

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
}
