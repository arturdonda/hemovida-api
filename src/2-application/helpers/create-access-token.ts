import { Session } from '@domain/entities';
import { TokenServiceProtocol } from '@application/protocols/infra';

export function createAccessToken({ tokenService, session }: CreateAccessTokenParams) {
	return tokenService.encode({ payload: { userId: session.userId }, expiresInMs: process.env.ACCESS_TOKEN_LIFETIME_IN_MS });
}

type CreateAccessTokenParams = {
	tokenService: TokenServiceProtocol;
	session: Session;
};
