import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrierEntity } from '../entities/carrier.entity';

@Injectable()
export class CarrierService {
	constructor(
		@InjectRepository(CarrierEntity)
		private readonly carrierRepository: Repository<CarrierEntity>,
	) {}

	async listCarriersWithFaculties(): Promise<any> {
		const carriers = await this.carrierRepository.createQueryBuilder('carrier').leftJoinAndSelect('carrier.faculty', 'faculty').getMany();

		return carriers.map((carrier) => ({
			id: carrier.id,
			name: carrier.name,
			faculty: [{ id: carrier.faculty.id, name: carrier.faculty.name }],
		}));
	}
}
