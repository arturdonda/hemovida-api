import { Tracer } from '@domain/app';
import { User } from '@domain/entities';
import { PageParams } from '@application/helpers';
import { GetAllUsersUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol } from '@application/protocols/infra';

export class GetAllUsersUsecase extends GetAllUsersUsecaseProtocol {
	constructor(tracer: Tracer, private readonly userRepository: DatabaseProtocol.Repositories.Public.User) {
		super(tracer);
	}

	protected validateParams(params: GetAllUsersUsecaseProtocol.Params): void {
		return;
	}

	protected async main(params: GetAllUsersUsecaseProtocol.Params): Promise<GetAllUsersUsecaseProtocol.Result> {
		const { pageNumber, pageSize, sortBy, sortDirection, ...searchableFields } = params;

		const pageParams = new PageParams<User>({ pageNumber, pageSize, sortBy, sortDirection });

		return this.userRepository.getAll({ pageParams, ...searchableFields });
	}
}
