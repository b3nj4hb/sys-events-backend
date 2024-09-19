import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class JustificationUpdateDto {
	@ApiProperty({
		description: 'ID of the justification record',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	@IsNotEmpty()
	@IsUUID()
	id: string;

	@ApiProperty({
		description: 'Status of the justification',
		example: 'approved or rejected',
	})
	@IsNotEmpty()
	@IsString()
	status: 'approved' | 'rejected';
}
