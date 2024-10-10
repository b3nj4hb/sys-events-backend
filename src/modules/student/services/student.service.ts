import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { CarrierEntity } from 'src/modules/carrier/entities/carrier.entity';
import { CycleEntity } from 'src/modules/student/entities/cycle.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as iconv from 'iconv-lite';
import { parse } from '@fast-csv/parse';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
	) {}

	async getStudentsWithEvents(): Promise<any> {
		return this.studentRepository
			.createQueryBuilder('student')
			.leftJoinAndSelect('student.profile', 'profile')
			.leftJoinAndSelect('student.carrier', 'carrier')
			.leftJoinAndSelect('carrier.faculty', 'faculty')
			.leftJoinAndSelect('student.studentEvent', 'studentEvent')
			.leftJoinAndSelect('studentEvent.event', 'event')
			.leftJoinAndSelect('event.eventType', 'eventType')
			.leftJoinAndSelect('student.cycle', 'cycle') // Join con la tabla cycle a través de student
			.select([
				// Datos del estudiante y sus subclases
				'student.id', // ID del estudiante
				'profile.id', // ID del profile
				'profile.fullName', // Nombre completo del perfil
				'profile.avatarUrl', // URL avatar del perfil
				'profile.code', // Codigo del perfil
				'profile.phone', // Numero de telefono
				'profile.email', // Email del perfil
				'profile.role', // Rol del perfil

				// Datos de la carrera y facultad asociada
				'carrier.name', // Nombre de la carrera
				'faculty.name', // Nombre de la facultad

				// Datos del ciclo asociado
				'cycle.name',

				// Datos del studentEvent
				'studentEvent.assistance', // Asistencia al evento

				// Datos del evento
				'event.name', // Nombre del evento
				'event.date', // Fecha del evento
				'event.hour', // Hora del evento
				'event.location', // Ubicación del evento
				'event.period', // Periodo del evento
				'eventType.name', // Tipo de evento
				'event.fileUrl',
			])
			.getMany();
	}

	async importStudentsFromCSV(file: Express.Multer.File): Promise<void> {
		const students = [];

		return new Promise((resolve, reject) => {
			if (!file.path) {
				return reject(new Error('File path is undefined'));
			}

			fs.createReadStream(file.path)
				.pipe(iconv.decodeStream('utf-8')) // Decodificar en UTF-8
				.pipe(parse({ headers: true })) // fast-csv con headers y saltar líneas vacías
				.on('data', (row) => {
					// Limpiar espacios en las propiedades del objeto row
					const cleanedRow = {};
					for (const key in row) {
						cleanedRow[key.trim()] = row[key].trim(); // Limpiar los espacios adicionales
					}

					// Validar si los datos son correctos
					if (!cleanedRow['fullName'] || !cleanedRow['email'] || !cleanedRow['code']) {
						console.error('Invalid row data:', cleanedRow);
						return; // Solo saltar este registro, no detener todo el proceso
					}

					students.push(cleanedRow);
				})
				.on('end', async () => {
					for (const studentData of students) {
						const profile = new ProfileEntity();
						profile.fullName = this.capitalizeFullName(studentData.fullName);
						profile.email = studentData.email;
						profile.phone = studentData.phone;
						profile.code = studentData.code;
						profile.avatarUrl = this.getAvatarUrl(studentData.fullName) || 'default-avatar-url'; // Agregar valor por defecto

						if (!profile.code) {
							console.error(`Student code is missing for: ${studentData.fullName}`);
							continue; // Continuar con el siguiente estudiante
						}

						profile.password = await this.hashPassword(studentData.code);

						try {
							// Log para verificar los valores que se están usando para buscar
							console.log(`Searching for Carrier with ID: ${studentData.carrier}`);
							console.log(`Searching for Cycle with name: ${studentData.cycle}`);

							// Buscar la carrera (carrier) y el ciclo en la base de datos
							const carrier = await this.studentRepository.manager.findOne(CarrierEntity, { where: { name: studentData.carrier } }); // { id: studentData.carrier }
							const cycle = await this.studentRepository.manager.findOne(CycleEntity, { where: { name: studentData.cycle.trim() } }); // Asegúrate de limpiar el nombre

							if (!carrier || !cycle) {
								console.error(`Carrier or cycle not found for student: ${studentData.fullName}`);
								continue; // Saltar al siguiente estudiante
							}

							// Crear una nueva entidad StudentEntity
							const student = new StudentEntity();
							student.profile = profile;
							student.carrier = carrier;
							student.cycle = cycle;
							student.group = studentData.group;
							student.campus = studentData.campus;

							// Guardar el perfil y el estudiante en la base de datos
							await this.studentRepository.manager.save(profile);
							await this.studentRepository.save(student);
						} catch (error) {
							console.error(`Error searching carrier or cycle for student: ${studentData.fullName}. Error:`, error.message);
							continue; // Continuar con el siguiente estudiante
						}
					}
					resolve(); // Resolver la promesa una vez que todo se ha guardado
				})
				.on('error', (error) => {
					reject(error); // Manejo de errores en el flujo
				});
			this.deleteUploadedFiles(); // Eliminar los archivos subidos
		});
	}

	async hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		return bcrypt.hash(password, saltRounds);
	}

	getAvatarUrl(fullName: string): string {
		const names = fullName.trim().split(' ');
		const initials = names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}` : `${names[0][0]}${names[0][1] || ''}`;
		return `https://ui-avatars.com/api/?size=225&name=${initials}`;
	}

	async deleteUploadedFiles(): Promise<void> {
		const directory = './uploads';

		fs.readdir(directory, (err, files) => {
			if (err) {
				console.error(`Unable to scan directory: ${err}`);
				return;
			}

			for (const file of files) {
				fs.unlink(`${directory}/${file}`, (err) => {
					if (err) {
						console.error(`Error deleting file: ${file}. Error: ${err}`);
					} else {
						console.log(`Deleted file: ${file}`);
					}
				});
			}
		});
	}

	capitalizeFullName(fullName: string): string {
		return fullName
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}
}
