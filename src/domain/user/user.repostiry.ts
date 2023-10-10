import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	public async createUser(input: Prisma.UserCreateInput) {
		const user = await this.databaseService.user.create({ data: input });
		return user;
	}

	public async findById(id: number) {
		const user = await this.databaseService.user.findFirst({ where: { id } });
		if (user === null) {
			throw new NotFoundException(`Пользователь с ID: [${id}] не найден!`);
		}
		return user;
	}
}
