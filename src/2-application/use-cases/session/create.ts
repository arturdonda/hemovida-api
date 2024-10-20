import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { DatabaseProtocol, IpLookupServiceProtocol, UserAgentLookupServiceProtocol } from '@application/protocols/infra';
import { CreateSessionUsecaseProtocol } from '@application/protocols/use-cases/session';
import { createSessionMetadata } from '@application/helpers';

export class CreateSessionUsecase extends CreateSessionUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session,
		private readonly ipLookupServiceProtocol: IpLookupServiceProtocol,
		private readonly userAgentLookupServiceProtocol: UserAgentLookupServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams(params: CreateSessionUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ ipAddress, userAgent, user }: CreateSessionUsecaseProtocol.Params): Promise<CreateSessionUsecaseProtocol.Result> {
		const metadata = await createSessionMetadata({
			ipAddress,
			userAgent,
			ipLookupServiceProtocol: this.ipLookupServiceProtocol,
			userAgentLookupServiceProtocol: this.userAgentLookupServiceProtocol,
		});

		const session = new Session({ ipAddress, userId: user.id, metadata });

		return this.sessionRepository.create(session);
	}
}
