import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
	providers: [AuthService],
	imports: [JwtModule, forwardRef(() => UserModule)],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
