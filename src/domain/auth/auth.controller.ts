import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { IdResponse } from 'src/types/models/id-response';
import { BadRequestApiError, ServerApiError } from 'src/types/models/errors';

@ApiTags('auth')
@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@PublicRoute()
	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiCreatedResponse({ type: IdResponse })
	@ApiBadRequestResponse({ type: BadRequestApiError })
	@ApiInternalServerErrorResponse({ type: ServerApiError })
	@Post('/registration')
	async registration(@Body() dto: CreateUserDto) {
		return this.authService.registration(dto);
	}
}
