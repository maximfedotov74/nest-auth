import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const configService = app.get(ConfigService);

	const logger = new Logger('Main');

	const PORT = configService.get<number>('APP_PORT');

	app.setGlobalPrefix('/api');

	app.use(cookieParser());

	app.enableCors({
		credentials: true,
		origin: configService.get('CLIENT_URL'),
	});

	const config = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/documentation', app, document);

	await app.listen(PORT, () => {
		logger.log(`Server successfully started on port "${PORT}"`);
	});
}
bootstrap();
