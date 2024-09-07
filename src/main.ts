import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';
// import { testConnection } from './config/connection.test';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors(CORS);

	// swagger
	const document = SwaggerModule.createDocument(app, SwaggerConfig);
	SwaggerModule.setup('', app, document);

	// await testConnection();
	await app.listen(3000);
}
bootstrap();
