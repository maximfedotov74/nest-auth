import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = () =>
	new DocumentBuilder()
		.setTitle('Nest.js REST API')
		.setDescription(
			'This is node.js REST API With Best Framework - Nest.js, using PostgreSQL, Prisma ORM, Swagger OpenApi',
		)
		.setVersion('1.0')
		.build();
