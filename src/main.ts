import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { testConnection } from './config/connection.test';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
	// await testConnection();
}
bootstrap();
