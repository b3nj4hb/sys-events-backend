import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { seedData } from './data/data.seed';
import * as dotenv from 'dotenv';
import { RoleEntity } from 'src/modules/profile/entities/role.entity';
import { FacultyEntity } from 'src/modules/carrier/entities/faculty.entity';
import { EventTypeEntity } from 'src/modules/event/entities/event-type.entity';
import { CycleEntity } from 'src/modules/student/entities/cycle.entity';

dotenv.config(); // Carga las variables de entorno del archivo .env

@Injectable()
export class SeedService implements OnModuleInit {
	constructor(
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>,
		@InjectRepository(FacultyEntity)
		private readonly facultyRepository: Repository<FacultyEntity>,
		@InjectRepository(CycleEntity)
		private readonly cycleRepository: Repository<CycleEntity>,
		@InjectRepository(EventTypeEntity)
		private readonly eventTypeRepository: Repository<EventTypeEntity>,
		// agregar mas en caso necesitar
	) {}

	async onModuleInit() {
		if (process.env.NODE_ENV !== 'production') {
			await this.seed();
		}
	}

	async seed() {
		try {
			// Inserta roles
			const roles = seedData.roles; // Asegúrate de que seedData tenga una propiedad 'roles'
			for (const role of roles) {
				const roleEntity = this.roleRepository.create(role);
				await this.roleRepository.save(roleEntity);
				console.log(`Role saved: ${role.name}`);
			}

			// Inserta facultades
			const faculties = seedData.faculties; // Asegúrate de que seedData tenga una propiedad 'faculties'
			for (const faculty of faculties) {
				const facultyEntity = this.facultyRepository.create(faculty);
				await this.facultyRepository.save(facultyEntity);
				console.log(`Faculty saved: ${faculty.name}`);
			}

			// Inserta ciclos
			const cycles = seedData.cycles; // Asegúrate de que seedData tenga una propiedad 'cycles'
			for (const cycle of cycles) {
				const cycleEntity = this.cycleRepository.create(cycle);
				await this.cycleRepository.save(cycleEntity);
				console.log(`Cycle saved: ${cycle.name}`);
			}

			// Inserta tipos de eventos
			const eventTypes = seedData.eventTypes; // Asegúrate de que seedData tenga una propiedad 'eventTypes'
			for (const eventType of eventTypes) {
				const eventTypeEntity = this.eventTypeRepository.create(eventType);
				await this.eventTypeRepository.save(eventTypeEntity);
				console.log(`Event Type saved: ${eventType.name}`);
			}

			// agregar mas en caso necesitar
		} catch (error) {
			console.error('Error seeding data:', error);
		}
	}
}
