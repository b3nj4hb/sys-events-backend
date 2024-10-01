import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno del archivo .env

const isDropSchema = process.env.SEED_ENV === 'true';

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: process.env.DB_TYPE as any,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
	dropSchema: isDropSchema,
	synchronize: isDropSchema,
	ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true, ca: process.env.DB_CA } : undefined,
};
