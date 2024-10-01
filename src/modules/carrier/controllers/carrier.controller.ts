import { Controller } from '@nestjs/common';
import { Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CarrierService } from '../services/carrier.service';

@ApiTags('Carrier')
@Controller('carrier')
export class CarrierController {
	constructor(private readonly carrierService: CarrierService) {}

	@UseGuards(JwtAuthGuard)
	@Get('')
	@ApiTags('Carrier')
	@ApiOperation({ summary: 'Retrieve carriers with associated faculties' })
	@ApiResponse({
		status: 200,
		description: 'Successfully retrieved the list of carriers with associated faculties',
		schema: {
			example: [
				{
					carrierName: 'Carrier 1',
					facultyName: 'Faculty 1',
				},
				{
					carrierName: 'Carrier 2',
					facultyName: 'Faculty 2',
				},
			],
		},
	})
	async listCarriersWithFaculties() {
		return this.carrierService.listCarriersWithFaculties();
	}
}
