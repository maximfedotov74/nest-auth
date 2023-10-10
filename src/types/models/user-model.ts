import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserModel implements User {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	id: number;
	@ApiProperty({ example: 'makc-dgek@mail.ru', description: 'Login' })
	login: string;
	@ApiProperty({
		example: 'asdioashdihasidahsdjashdkajshd',
		description: 'Пароль в виде хеш-строки',
	})
	password: string;
}
