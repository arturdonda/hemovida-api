import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { DatabaseProtocol, IpLookupServiceProtocol, UserAgentLookupServiceProtocol } from '@application/protocols/infra';
import { UpdateSessionUsecaseProtocol } from '@application/protocols/use-cases/session';
import { InvalidSessionError, NotFoundError } from '@application/errors';
import { createSessionMetadata } from '@application/helpers';

export class UpdateSessionUsecase extends UpdateSessionUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session,
		private readonly ipLookupServiceProtocol: IpLookupServiceProtocol,
		private readonly userAgentLookupServiceProtocol: UserAgentLookupServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams(params: UpdateSessionUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id, ipAddress, userAgent }: UpdateSessionUsecaseProtocol.Params): Promise<UpdateSessionUsecaseProtocol.Result> {
		const session = await this.sessionRepository.getOne({ id });

		if (session === null) throw new NotFoundError(Session);

		if (session.isActive === false) throw new InvalidSessionError(session);

		const metadata = await createSessionMetadata({
			ipAddress,
			userAgent,
			ipLookupService: this.ipLookupServiceProtocol,
			userAgentLookupService: this.userAgentLookupServiceProtocol,
		});

		session.update({ ipAddress, metadata });

		return this.sessionRepository.update(session);
	}
}
