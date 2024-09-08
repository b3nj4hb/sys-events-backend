import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Post('')
	@ApiTags('Profile')
	@ApiOperation({ summary: 'Create a new profile' })
	async create(@Body() createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
		return this.profileService.create({ ...createProfileDto });
	}

	@Patch(':id')
	@ApiTags('Profile')
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'The ID of the profile to update',
		example: 'd4df59c9-f335-4d2a-9e2d-c8d46167ca94',
	})
	@ApiOperation({ summary: 'Update a profile' })
	async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
		return this.profileService.updateProfile({ ...updateProfileDto, id });
	}
}
