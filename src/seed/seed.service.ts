import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { seedData } from './data/data.seed';
import * as dotenv from 'dotenv';
import { RoleEntity } from 'src/modules/profile/entities/role.entity';
import { FacultyEntity } from 'src/modules/carrier/entities/faculty.entity';
import { EventTypeEntity } from 'src/modules/event/entities/event-type.entity';
import { CycleEntity } from 'src/modules/student/entities/cycle.entity';
import { CarrierEntity } from 'src/modules/carrier/entities/carrier.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';

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
		@InjectRepository(CarrierEntity)
		private readonly carrierRepository: Repository<CarrierEntity>,
		@InjectRepository(EventEntity)
		private readonly eventRepository: Repository<EventEntity>,
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
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
			const roles = seedData.roles;
			const savedRoles = [];
			for (const role of roles) {
				const roleEntity = this.roleRepository.create(role);
				const savedRole = await this.roleRepository.save(roleEntity);
				savedRoles.push(savedRole);
				console.log(`Role saved: ${role.name}`);
			}

			// Inserta facultades
			const faculties = seedData.faculties;
			const savedFaculties = [];
			for (const faculty of faculties) {
				const facultyEntity = this.facultyRepository.create(faculty);
				const savedFaculty = await this.facultyRepository.save(facultyEntity);
				savedFaculties.push(savedFaculty);
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
			const eventTypes = seedData.eventTypes;
			const savedEventTypes = [];
			for (const eventType of eventTypes) {
				const eventTypeEntity = this.eventTypeRepository.create(eventType);
				const savedEventType =
					await this.eventTypeRepository.save(eventTypeEntity);
				savedEventTypes.push(savedEventType);
				console.log(`Event Type saved: ${eventType.name}`);
			}

			// Inserta carriers
			const carriers = seedData.carriers; // Asegúrate de que seedData tenga una propiedad 'carriers'
			for (const carrier of carriers) {
				// Encuentra la facultad correspondiente para este carrier
				const faculty = savedFaculties.find(
					(f) => f.name === carrier.facultyName,
				);
				if (!faculty) {
					console.error(
						`Faculty not found for carrier: ${carrier.facultyName}`,
					);
					continue;
				}

				const carrierEntity = this.carrierRepository.create({
					...carrier,
					faculty,
				});
				await this.carrierRepository.save(carrierEntity);
				console.log(`Carrier saved: ${carrier.name}`);
			}

			// Inserta eventos
			const events = seedData.events;
			for (const event of events) {
				const eventType = savedEventTypes.find(
					(et) => et.name === event.eventTypeName,
				);
				if (!eventType) {
					console.error(
						`Event Type not found for event: ${event.eventTypeName}`,
					);
					continue;
				}

				const eventEntity = this.eventRepository.create({
					...event,
					eventType,
				});
				await this.eventRepository.save(eventEntity);
				console.log(`Event saved: ${event.name}`);
			}

			// Inserta profiles
			const profiles = seedData.profiles;
			for (const profile of profiles) {
				const role = savedRoles.find((r) => r.name === profile.roleName);
				if (!role) {
					console.error(`Role not found for profile: ${profile.roleName}`);
					continue;
				}

				const profileEntity = this.profileRepository.create({
					...profile,
					role,
				});
				await this.profileRepository.save(profileEntity);
				console.log(`Profile saved: ${profile.fullName}`);
			}

			// agregar mas en caso necesitar
		} catch (error) {
			console.error('Error seeding data:', error);
		}
	}
}
