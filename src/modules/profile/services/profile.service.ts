import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { CarrierEntity } from 'src/modules/carrier/entities/carrier.entity';
import { CycleEntity } from 'src/modules/student/entities/cycle.entity';

@Injectable()
export class ProfileService {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager, // Inyectamos EntityManager
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
	) {}

	async create(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
		return this.entityManager.transaction(async (transactionalEntityManager) => {
			const { fullName, code, phone, email, password, roleId, carrierId, cycleId } = createProfileDto;

			// Buscar el tipo de rol por su ID
			const role = await transactionalEntityManager.findOne(RoleEntity, {
				where: { id: roleId },
			});

			if (!role) {
				throw new NotFoundException(`Role with id "${roleId}" not found`);
			}

			// Crear un nuevo rol con los datos proporcionados
			const profile = transactionalEntityManager.create(ProfileEntity, {
				fullName,
				code,
				phone,
				email,
				role, // Asocia el tipo de rol encontrado
			});
			// Encriptar la contraseña
			profile.password = await this.hashPassword(password);

			// Generar URL del avatar automáticamente usando el fullName
			profile.avatarUrl = this.generateAvatarUrl(fullName);
			const savedProfile = await transactionalEntityManager.save(profile);
			// Si el rol es "estudiante", creamos el estudiante directamente en la transacción
			if (role.name.toLowerCase() === 'estudiante' && carrierId && cycleId) {
				// Buscar el tipo de rol por su ID
				const carrier = await transactionalEntityManager.findOne(CarrierEntity, {
					where: { id: carrierId },
				});

				if (!carrier) {
					throw new NotFoundException(`Carrier with id "${carrierId}" not found`);
				}
				const cycle = await transactionalEntityManager.findOne(CycleEntity, {
					where: { id: cycleId },
				});

				if (!cycle) {
					throw new NotFoundException(`cycle with id "${cycleId}" not found`);
				}

				const student = transactionalEntityManager.create(StudentEntity, {
					carrier,
					cycle,
					profile: savedProfile,
				});
				await transactionalEntityManager.save(student);
			}

			return savedProfile;
		});
	}

	// Método para actualizar un perfil existente
	async updateProfile(updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
		const { id, fullName, phone, email, password, state } = updateProfileDto;

		// Buscar el perfil por su ID
		const profile = await this.profileRepository.findOne({ where: { id } });

		if (!profile) {
			throw new NotFoundException(`Profile with ID "${id}" not found`);
		}

		// Actualizar los campos del perfil
		if (fullName) profile.fullName = fullName;
		if (fullName) profile.avatarUrl = this.generateAvatarUrl(fullName);
		if (phone) profile.phone = phone;
		if (email) profile.email = email;

		/* TODO: Deberia confirmar password para cambiar el actual
		 * quiza en otro endpoint. que sea especificamente para cambiar password.
		 */
		if (password) profile.password = await this.hashPassword(password);
		if (state) profile.state = state;

		// Guardar los cambios en la base de datos
		return this.profileRepository.save(profile);
	}

	private async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}

	// Función para generar la URL del avatar
	private generateAvatarUrl(fullName: string): string {
		const firstName = fullName.split(' ')[0]; // Tomar la primera palabra del nombre
		return `https://ui-avatars.com/api/?size=225&name=${encodeURIComponent(firstName)}`;
	}
}
