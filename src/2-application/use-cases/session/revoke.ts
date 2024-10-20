import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { DatabaseProtocol } from '@application/protocols/infra';
import { RevokeSessionUsecaseProtocol } from '@application/protocols/use-cases/session';
import { NotFoundError } from '@application/errors';

export class RevokeSessionUsecase extends RevokeSessionUsecaseProtocol {
	constructor(tracer: Tracer, private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session) {
		super(tracer);
	}

	protected validateParams(params: RevokeSessionUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id, user }: RevokeSessionUsecaseProtocol.Params): Promise<RevokeSessionUsecaseProtocol.Result> {
		const session = await this.sessionRepository.getOne({ id });

		if (session === null || session.userId !== user.id) throw new NotFoundError(Session);

		if (session.isRevoked) return session;

		session.revoke();

		return this.sessionRepository.update(session);
	}
}
