import { TokenServiceProtocol } from '@application/protocols/infra';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class JwtTokenService extends TokenServiceProtocol {
	private readonly AUDIENCE: string;
	private readonly ISSUER: string;
	private readonly SECRET: string;

	constructor() {
		super();

		this.AUDIENCE = process.env.TOKEN_SERVICE_AUDIENCE;
		this.ISSUER = process.env.TOKEN_SERVICE_ISSUER;
		this.SECRET = process.env.TOKEN_SERVICE_SECRET;
	}
	encode<T extends Record<string, unknown>>({ payload, expiresInMs }: TokenServiceProtocol.Encode.Params<T>): TokenServiceProtocol.Encode.Result {
		return jwt.sign(payload, this.SECRET, {
			audience: this.AUDIENCE,
			issuer: this.ISSUER,
			expiresIn: expiresInMs / 1000,
		});
	}

	decode<T extends Record<string, unknown>>(token: TokenServiceProtocol.Decode.Params): TokenServiceProtocol.Decode.Result<T> {
		const decoded = jwt.verify(token, this.SECRET, {
			audience: this.AUDIENCE,
			issuer: this.ISSUER,
		});

		if (typeof decoded === 'string') throw new Error('Decoded token is a string!');

		return decoded as T;
	}
}
