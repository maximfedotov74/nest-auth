import { Request } from 'express';
import { JwtClaims } from './jwt-claims';

export type AppRequest = {
	user: JwtClaims;
} & Request;
