import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { JwtClaims } from 'src/types/jwt-claims';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {}

	async registration(dto: CreateUserDto) {
		return this.userService.createUser(dto);
	}

	async signTokens(claims: JwtClaims) {
		const accessToken = await this.jwtService.signAsync(
			{ ...claims },
			{
				expiresIn: this.configService.get('ACCESS_TOKEN_TTD'),
				secret: this.configService.get('ACCESS_TOKEN_SECRET'),
			},
		);
		const refreshToken = await this.jwtService.signAsync(
			{ ...claims },
			{
				expiresIn: this.configService.get('REFRESH_TOKEN_TTD'),
				secret: this.configService.get('REFRESH_TOKEN_SECRET'),
			},
		);
		return { accessToken, refreshToken };
	}

	async verifyToken(token: string, type: 'access' | 'refresh') {
		try {
			const payload = await this.jwtService.verifyAsync<JwtClaims>(token, {
				secret: this.configService.get(
					type === 'access' ? 'ACCESS_TOKEN_SECRET' : 'REFRESH_TOKEN_SECRET',
				),
			});
			return payload;
		} catch (e) {
			throw new UnauthorizedException('Token expired');
		}
	}
}
