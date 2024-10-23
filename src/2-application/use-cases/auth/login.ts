import { Tracer } from '@domain/app';
import { Session, User } from '@domain/entities';
import { LoginUsecaseProtocol } from '@application/protocols/use-cases/auth';
import {
	DatabaseProtocol,
	HashServiceProtocol,
	IpLookupServiceProtocol,
	TokenServiceProtocol,
	UserAgentLookupServiceProtocol,
} from '@application/protocols/infra';
import { InvalidCredentialsError } from '@application/errors';
import { createSessionMetadata } from '@application/helpers';

export class LoginUsecase extends LoginUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly userRepository: DatabaseProtocol.Repositories.Public.User,
		private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session,
		private readonly hashService: HashServiceProtocol,
		private readonly tokenService: TokenServiceProtocol,
		private readonly ipLookupService: IpLookupServiceProtocol,
		private readonly userAgentLookupService: UserAgentLookupServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams(params: LoginUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ email, password, ipAddress, userAgent }: LoginUsecaseProtocol.Params): Promise<LoginUsecaseProtocol.Result> {
		const user = await this.userRepository.getOne({ email });

		if (user === null) throw new InvalidCredentialsError();

		const passwordMatches = this.hashService.verify({ text: password, hash: user.password });

		if (passwordMatches === false) throw new InvalidCredentialsError();

		const session = await this.createSession({ ipAddress, userAgent, user });

		const accessToken = this.tokenService.encode({ payload: { userId: user.id }, expiresInMs: process.env.ACCESS_TOKEN_LIFETIME_IN_MS });

		return { user, accessToken, refreshToken: session.refreshToken };
	}

	private async createSession({ ipAddress, userAgent, user }: CreateSessionParams) {
		const metadata = await createSessionMetadata({
			ipAddress,
			userAgent,
			ipLookupService: this.ipLookupService,
			userAgentLookupService: this.userAgentLookupService,
		});

		const session = new Session({ ipAddress, userId: user.id, metadata });

		return this.sessionRepository.create(session);
	}
}

type CreateSessionParams = Pick<LoginUsecaseProtocol.Params, 'ipAddress' | 'userAgent'> & { user: User };
