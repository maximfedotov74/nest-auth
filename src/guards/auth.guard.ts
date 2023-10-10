import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../domain/auth/auth.service';
import { AppRequest } from 'src/types/request';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly authService: AuthService,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>(
			'public',
			context.getHandler(),
		);

		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AppRequest>();
		const authHeader = request.headers.authorization;

		if (authHeader && authHeader.startsWith('Bearer')) {
			const splitted = authHeader.split(' ');
			const token = splitted[1];
			const user = await this.authService.verifyToken(token, 'access');
			request.user = user;
			return true;
		}

		return false;
	}
}
