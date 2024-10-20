import { Tracer } from '@domain/app';
import { LoginUsecaseProtocol } from '@application/protocols/use-cases/auth';
import { DatabaseProtocol, HashServiceProtocol, TokenServiceProtocol } from '@application/protocols/infra';
import { InvalidCredentialsError } from '@application/errors';
import { CreateSessionUsecase } from '../session';

export class LoginUsecase extends LoginUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly userRepository: DatabaseProtocol.Repositories.Public.User,
		private readonly hashService: HashServiceProtocol,
		private readonly tokenService: TokenServiceProtocol,
		private readonly createSessionUsecase: CreateSessionUsecase
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

		const session = await this.createSessionUsecase.exec({ ipAddress, userAgent, user });

		const accessToken = this.tokenService.encode({ payload: { userId: user.id }, expiresInMs: process.env.ACCESS_TOKEN_LIFETIME_IN_MS });

		return { user, accessToken, refreshToken: session.refreshToken };
	}
}
