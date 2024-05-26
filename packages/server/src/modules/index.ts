import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { AppConfigModule } from 'src/config';
import { LoggerMiddleware } from 'src/common/middlewares/loggerMiddleware';
import { UserModule } from 'src/modules/user';
import { AuthModule } from 'src/modules/auth';
import { AccountModule } from 'src/modules/account';
import { RoleModule } from 'src/modules/role';
import { LoggerModule } from 'src/common/logger';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/infras/http-exception.filter';

@Module({
	imports: [
		AppConfigModule,
		DatabaseModule,
		UserModule,
		AuthModule,
		AccountModule,
		RoleModule,
		LoggerModule
	],
	providers: [
		Logger,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		}
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
