import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { UserRepository } from './user.repostiry';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	public async createUser(dto: CreateUserDto) {
		const hashedPassword = await this.hashPassword(dto.password);
		dto.password = hashedPassword;

		return this.userRepository.createUser(dto);
	}

	public async findById(id: number) {
		const user = await this.userRepository.findById(id);
		return user;
	}

	private async hashPassword(password: string) {
		const salt = await genSalt(10);
		const passwordHash = await hash(password, salt);
		return passwordHash;
	}
}
