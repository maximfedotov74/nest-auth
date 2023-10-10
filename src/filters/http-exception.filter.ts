import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiError, BadRequestApiError } from 'src/types/models/errors';

interface BadRequestValidationExceptionResponse {
	message: string[] | string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const message = exception.message;
		const exResponse = exception.getResponse();

		this.logger.error(`Exception: ${exception.message}, status: ${status}`);

		if (status === 400) {
			const details: string[] = [];

			if (typeof exResponse == 'object') {
				const errorMessage = (
					exResponse as BadRequestValidationExceptionResponse
				)?.message;

				if (Array.isArray(errorMessage)) {
					for (const m of errorMessage) {
						details.push(m);
					}
				}
			}
			response
				.status(status)
				.json(new BadRequestApiError(message, details, status));
		} else {
			response.status(status).json(new ApiError(message, status));
		}
	}
}
