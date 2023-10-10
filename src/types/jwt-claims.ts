import { User } from '@prisma/client';

export type JwtClaims = Pick<User, 'id'>;
