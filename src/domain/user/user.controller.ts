import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { UserModel } from 'src/types/models/user-model';
import { BadRequestApiError, NotFoundApiError } from 'src/types/models/errors';

@ApiTags('user')
@UseFilters(new HttpExceptionFilter())
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@PublicRoute()
	@ApiOperation({ summary: 'Получение пользователя по ID' })
	@ApiOkResponse({ type: UserModel })
	@ApiBadRequestResponse({ type: BadRequestApiError })
	@ApiNotFoundResponse({ type: NotFoundApiError })
	@Get('/:id')
	async getById(@Param('id', new ParseIntPipe()) id: number) {
		return this.userService.findById(id);
	}
}
