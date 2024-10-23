import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { RefreshAccessUsecaseProtocol } from '@application/protocols/use-cases/auth';
import { DatabaseProtocol, IpLookupServiceProtocol, TokenServiceProtocol, UserAgentLookupServiceProtocol } from '@application/protocols/infra';
import { createAccessToken, createSessionMetadata } from '@application/helpers';
import { NotFoundError } from '@application/errors';

export class RefreshAccessUsecase extends RefreshAccessUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session,
		private readonly tokenService: TokenServiceProtocol,
		private readonly ipLookupService: IpLookupServiceProtocol,
		private readonly userAgentLookupService: UserAgentLookupServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams(params: RefreshAccessUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ refreshToken, ipAddress, userAgent }: RefreshAccessUsecaseProtocol.Params): Promise<RefreshAccessUsecaseProtocol.Result> {
		const session = await this.sessionRepository.getOne({ refreshToken });

		if (session === null) throw new NotFoundError(Session);

		const metadata = await createSessionMetadata({
			ipAddress,
			userAgent,
			ipLookupService: this.ipLookupService,
			userAgentLookupService: this.userAgentLookupService,
		});

		session.update({ ipAddress, metadata });

		await this.sessionRepository.update(session);

		const accessToken = createAccessToken({ tokenService: this.tokenService, session });

		return { accessToken };
	}
}
