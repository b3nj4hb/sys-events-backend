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
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { StudentEventEntity } from 'src/modules/student-event/entities/student-event.entity';

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
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
		@InjectRepository(StudentEventEntity)
		private readonly studentEventRepository: Repository<StudentEventEntity>,
		// agregar mas en caso necesitar
	) {}

	async onModuleInit() {
		if (process.env.SEED_ENV === 'true') {
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
			const cycles = seedData.cycles;
			const savedCycles = [];
			for (const cycle of cycles) {
				const cycleEntity = this.cycleRepository.create(cycle);
				const savedCycle = await this.cycleRepository.save(cycleEntity);
				savedCycles.push(savedCycle);
				console.log(`Cycle saved: ${cycle.name}`);
			}

			// Inserta tipos de eventos
			const eventTypes = seedData.eventTypes;
			const savedEventTypes = [];
			for (const eventType of eventTypes) {
				const eventTypeEntity = this.eventTypeRepository.create(eventType);
				const savedEventType = await this.eventTypeRepository.save(eventTypeEntity);
				savedEventTypes.push(savedEventType);
				console.log(`Event Type saved: ${eventType.name}`);
			}

			// Inserta carriers
			const carriers = seedData.carriers;
			const savedCarriers = [];
			for (const carrier of carriers) {
				// Encuentra la facultad correspondiente para este carrier
				const faculty = savedFaculties.find((f) => f.name === carrier.facultyName);
				if (!faculty) {
					console.error(`Faculty not found for carrier: ${carrier.facultyName}`);
					continue;
				}

				const carrierEntity = this.carrierRepository.create({
					...carrier,
					faculty,
				});
				const savedCarrier = await this.carrierRepository.save(carrierEntity);
				savedCarriers.push(savedCarrier);
				console.log(`Carrier saved: ${carrier.name}`);
			}

			// Inserta eventos
			const events = seedData.events;
			const savedEvents = [];
			for (const event of events) {
				const eventType = savedEventTypes.find((et) => et.name === event.eventTypeName);
				if (!eventType) {
					console.error(`Event Type not found for event: ${event.eventTypeName}`);
					continue;
				}

				const carrier = savedCarriers.find((c) => c.name === event.carrierName);
				if (!carrier) {
					console.error(`Carrier not found for event: ${event.carrierName}`);
					continue;
				}

				const eventEntity = this.eventRepository.create({
					...event,
					eventType,
					carrier,
				});
				const savedEvent = await this.eventRepository.save(eventEntity);
				savedEvents.push(savedEvent);
				console.log(`Event saved: ${event.name}`);
			}

			// Inserta profiles
			const profiles = seedData.profiles;
			const savedProfiles = [];
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
				const savedProfile = await this.profileRepository.save(profileEntity);
				savedProfiles.push(savedProfile);
				console.log(`Profile saved: ${profile.fullName}`);
			}

			// Inserta estudiantes
			const students = seedData.students;
			const savedStudents = [];
			for (const studentData of students) {
				// Filtra perfiles con rol "Estudiante"
				const profile = savedProfiles.find((p) => p.code === studentData.profileCode && p.role.name === 'Estudiante');
				if (!profile) {
					console.error(`Profile not found for code: ${studentData.profileCode}`);
					continue;
				}

				const carrier = savedCarriers.find((c) => c.name === studentData.carrierName);
				if (!carrier) {
					console.error(`Carrier not found for name: ${studentData.carrierName}`);
					continue;
				}

				const cycle = savedCycles.find((c) => c.name === studentData.cycleName);
				if (!cycle) {
					console.error(`Cycle not found for name: ${studentData.cycleName}`);
					continue;
				}

				const studentEntity = this.studentRepository.create({
					profile,
					carrier,
					cycle,
				});
				const savedStudent = await this.studentRepository.save(studentEntity);
				savedStudents.push(savedStudent);
				console.log(`Student saved with profile code: ${studentData.profileCode}`);
			}

			// Inserta student events
			// const studentEvents = seedData.studentEvents;
			// for (const studentEventData of studentEvents) {
			// 	const event = savedEvents.find(
			// 		(e) => e.name === studentEventData.eventName && e.date === studentEventData.date && e.hour === studentEventData.hour && e.location === studentEventData.location,
			// 	);
			// 	if (!event) {
			// 		console.error(`Event not found for data: ${JSON.stringify(studentEventData)}`);
			// 		continue;
			// 	}

			// 	const student = savedStudents.find((s) => s.profile.code === studentEventData.studentProfileCode);
			// 	if (!student) {
			// 		console.error(`Student not found for profile code: ${studentEventData.studentProfileCode}`);
			// 		continue;
			// 	}

			// 	const studentEventEntity = this.studentEventRepository.create({
			// 		assistance: studentEventData.assistance,
			// 		student,
			// 		event,
			// 	});
			// 	await this.studentEventRepository.save(studentEventEntity);
			// 	console.log(`Student Event saved for student code: ${studentEventData.studentProfileCode}`);
			// }

			// agregar mas en caso necesitar
		} catch (error) {
			console.error('Error seeding data:', error);
		}
	}
}
