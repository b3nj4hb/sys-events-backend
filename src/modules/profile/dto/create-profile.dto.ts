// src/dto/profile.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { IsUnique } from 'src/shared/validation/is-unique';
import { IsStudentRequired } from '../validation/is-student-required-constraint';

export class CreateProfileDto {
	@ApiProperty({
		description: 'Full Name of profile',
		example: 'Manuel Gonzales',
	})
	@IsNotEmpty()
	@IsString()
	fullName: string;

	@ApiProperty({
		description: 'Code of profile',
		example: '201410859',
	})
	@IsNotEmpty()
	@IsString()
	@IsUnique({ column: 'code', tableName: 'profile' })
	code: string;

	@ApiProperty({
		description: 'Phone of profile',
		example: '123456789',
	})
	@IsString()
	phone: string;

	@ApiProperty({
		description: 'Email of profile',
		example: '123456789',
	})
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({
		description: 'Email of profile',
		example: '123456789',
	})
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty({
		description: 'ID of the role',
		example: '498ad4b2-0ba8-4a82-9a27-c46b9272a933',
	})
	@IsNotEmpty()
	@IsUUID()
	roleId: string; // ID del rol

	@ApiProperty({
		description: 'ID of carrier',
		example: '498ad4b2-0ba8-4a82-9a27-c46b9272a933',
	})
	@IsStudentRequired()
	carrierId: string; // ID del carrier

	@ApiProperty({
		description: 'ID of cycle',
		example: '498ad4b2-0ba8-4a82-9a27-c46b9272a933',
	})
	@IsStudentRequired()
	cycleId: string; // ID del cycle
}
