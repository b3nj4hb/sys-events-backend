// src/dto/profile.dto.ts
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';
import { STATES } from 'src/constants/states';

export class UpdateProfileDto extends OmitType(PartialType(CreateProfileDto), ['code', 'roleId', 'carrierId', 'cycleId'] as const) {
	@IsString()
	@IsUUID()
	@IsOptional() // Solo para actualizaciones, no es obligatorio al crear
	id: string; // ID del profile a actualizar (opcional para creación)

	@IsEnum(STATES)
	@IsOptional() // Solo para actualizaciones, no es obligatorio al crear
	state: STATES; // ID del profile a actualizar (opcional para creación)
}
