import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './user.repostiry';
import { AuthModule } from '../auth/auth.module';

@Module({
	controllers: [UserController],
	imports: [DatabaseModule, forwardRef(() => AuthModule)],
	providers: [UserService, UserRepository],
	exports: [UserService],
})
export class UserModule {}
