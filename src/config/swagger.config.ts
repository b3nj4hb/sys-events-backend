import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder().setTitle('API Documentation').setDescription('The API description').setVersion('1.0').build();
