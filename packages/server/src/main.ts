import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules';
import { AppConfigService } from './config/service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { AppLoggerService } from './common/logger/service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/infras/http-exception.filter';
import {
	utilities as nestWinstonModuleUtilities,
	WinstonModule,
  } from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import { ResponseAddAccessTokenToHeaderInterceptor } from './common/interceptors/responseWithAllowOriginInterceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		// logger: WinstonModule
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	app.useGlobalFilters(new HttpExceptionFilter());
	app.use(cookieParser());

	const appConfigService = app.get(AppConfigService);
	const requiredEnvVariables = [
		'POSTGRES_HOST',
		'POSTGRES_PORT',
		'POSTGRES_USER',
		'POSTGRES_PASSWORD',
		'POSTGRES_DATABASE',
		'JWT_SECRET',
		'JWT_EXPIRATION_TIME',
	];

	appConfigService.ensureValues(requiredEnvVariables);
	const prismaSerivce = app.get(DatabaseService);
	prismaSerivce.$connect();

	const logger = app.get(AppLoggerService);
	app.useLogger(logger);

	const port = appConfigService.port;

	setupSwagger(app);

	const NODE_ENV = process.env.NODE_ENV || 'development';
	app.useGlobalInterceptors(new ResponseAddAccessTokenToHeaderInterceptor());
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});
	await app.listen(port, () => {
		logger.log(`Server is running on port ${port}`, 'Bootstrap');
		logger.log(`Current node environment: ${NODE_ENV}`);
	});

	await prismaSerivce.enableShutdownHooks(app);
}

bootstrap();

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Book auth example')
		.setDescription('The book auth API description')
		.setVersion('1.0')
		.addTag('auth')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
}

export const SRC_DIR = __dirname