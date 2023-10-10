import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'makc-dgek@mail.ru', description: 'Login' })
	@IsString()
	@IsEmail()
	login: string;

	@ApiProperty({
		example: '123sdfsdf',
		description: 'Пароль',
	})
	@IsString()
	@Length(6, 100)
	password: string;
}
