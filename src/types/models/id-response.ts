import { ApiProperty } from '@nestjs/swagger';

export class IdResponse {
	@ApiProperty({ example: 1, description: 'ID созданной записи' })
	public id: number;
}
