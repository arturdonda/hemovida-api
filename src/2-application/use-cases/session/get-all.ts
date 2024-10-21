import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { DatabaseProtocol } from '@application/protocols/infra';
import { GetAllSessionsUsecaseProtocol } from '@application/protocols/use-cases/session';
import { PageParams } from '@application/helpers';

export class GetAllSessionsUsecase extends GetAllSessionsUsecaseProtocol {
	constructor(tracer: Tracer, private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session) {
		super(tracer);
	}

	protected validateParams(params: GetAllSessionsUsecaseProtocol.Params): void {
		return;
	}

	protected async main(params: GetAllSessionsUsecaseProtocol.Params): Promise<GetAllSessionsUsecaseProtocol.Result> {
		const { pageNumber, pageSize, sortBy, sortDirection, user, ...searchableFields } = params;

		const pageParams = new PageParams<Session>({ pageNumber, pageSize, sortBy, sortDirection });

		return this.sessionRepository.getAll({ pageParams, ...searchableFields, status: Session.Status.Active, userId: user.id });
	}
}
