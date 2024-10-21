import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { LogoutUsecaseProtocol } from '@application/protocols/use-cases/auth';
import { DatabaseProtocol } from '@application/protocols/infra';
import { NotFoundError } from '@application/errors';

export class LogoutUsecase extends LogoutUsecaseProtocol {
	constructor(tracer: Tracer, private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session) {
		super(tracer);
	}

	protected validateParams(params: LogoutUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ refreshToken }: LogoutUsecaseProtocol.Params): Promise<LogoutUsecaseProtocol.Result> {
		const session = await this.sessionRepository.getOne({ refreshToken });

		if (session === null) throw new NotFoundError(Session);

		session.revoke();

		await this.sessionRepository.update(session);
	}
}
