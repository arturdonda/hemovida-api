import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { DatabaseProtocol } from '@application/protocols/infra';
import { GetOneSessionUsecaseProtocol } from '@application/protocols/use-cases/session';
import { NotFoundError } from '@application/errors';

export class GetOneSessionUsecase extends GetOneSessionUsecaseProtocol {
	constructor(tracer: Tracer, private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session) {
		super(tracer);
	}

	protected validateParams(params: GetOneSessionUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id, user }: GetOneSessionUsecaseProtocol.Params): Promise<GetOneSessionUsecaseProtocol.Result> {
		const session = await this.sessionRepository.getOne({ id });

		if (session === null || session.userId !== user.id) throw new NotFoundError(Session);

		return session;
	}
}
