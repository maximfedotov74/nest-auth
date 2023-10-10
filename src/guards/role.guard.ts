import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppRequest } from '../types/request';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AppRequest>();

		const user = request.user;

		if (!user) {
			return false;
		}
		return true;
		//return roles.some((r) => r == user.role);
	}
}
