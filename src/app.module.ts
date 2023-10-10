import { Module } from '@nestjs/common';

import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';
import { APP_FILTER, APP_GUARD, HttpAdapterHost } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { AllExceptionsFilter } from './filters/all.filter';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(process.cwd(), `.${process.env.NODE_ENV}.env`),
		}),
		AuthModule,
		UserModule,
		DatabaseModule,
	],
	providers: [
		{ provide: APP_GUARD, useClass: AuthGuard },
		{
			provide: APP_FILTER,
			useFactory: (adapter: HttpAdapterHost) => {
				return new AllExceptionsFilter(adapter);
			},
			inject: [HttpAdapterHost],
		},
	],
})
export class AppModule {}
