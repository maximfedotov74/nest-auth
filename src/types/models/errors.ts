import { ApiProperty } from '@nestjs/swagger';

export class ServerError {
	@ApiProperty({ example: 500, description: 'Статус-код ошибки' })
	public status: number;
	@ApiProperty({
		example: 'Произошла ошибка при подключении к Базе данных!',
		description: 'Описание',
	})
	public message: string;

	constructor(status: number, message: string) {
		this.message = message;
		this.status = status;
	}
}

export class ApiError {
	public status: number;

	public message: string;

	constructor(message: string, status: number) {
		this.message = message;
		this.status = status;
	}
}

export class UnauthorizedApiError extends ApiError {
	@ApiProperty({ example: 401, description: 'Статус-код' })
	public status: number;

	@ApiProperty({
		example: 'Нет авторизации',
		description: 'Описание',
	})
	public message: string;
}

export class ForbiddenApiError extends ApiError {
	@ApiProperty({ example: 403, description: 'Статус-код' })
	public status: number;

	@ApiProperty({
		example: 'Доступ запрещен!',
		description: 'Описание',
	})
	public message: string;
}

export class NotFoundApiError extends ApiError {
	@ApiProperty({ example: 404, description: 'Статус-код' })
	public status: number;

	@ApiProperty({
		example: 'Не найдено!',
		description: 'Описание',
	})
	public message: string;
}

export class ServerApiError extends ApiError {
	@ApiProperty({ example: 500, description: 'Статус-код' })
	public status: number;

	@ApiProperty({
		example: 'Ошибка на стороне серверной части!',
		description: 'Описание',
	})
	public message: string;
}

export class BadRequestApiError extends ApiError {
	@ApiProperty({
		example: ['login must be an email'],
		description: 'Ошибки валидации',
	})
	public details: string[];

	@ApiProperty({
		example: 'Произошла ошибка при валидации',
		description: 'Описание',
	})
	public message: string;

	@ApiProperty({
		example: 400,
		description: 'Описание',
	})
	public status: number;

	constructor(message: string, details: string[], status: number) {
		super(message, status);
		this.details = details;
	}
}
