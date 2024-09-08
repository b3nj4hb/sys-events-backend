import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';
import { useContainer } from 'class-validator';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { testConnection } from './config/connection.test';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors(CORS);

	// Usar el ValidationPipe globalmente para validar DTOs
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

	// Habilitar el uso de ClassSerializerInterceptor para transformar las respuestas
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	// Aquí le indicamos a class-validator que use el contenedor de NestJS
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	// swagger
	const document = SwaggerModule.createDocument(app, SwaggerConfig);
	SwaggerModule.setup('', app, document);

	// await testConnection();
	await app.listen(3000);
}
bootstrap();
