import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder().setTitle('Event Management API Documentation').setDescription('API documentation for the Event Management application').setVersion('1.0').build();
