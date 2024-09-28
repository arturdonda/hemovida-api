import { Tracer } from '@domain/app';
import { User } from '@domain/entities';
import { GetAllUsersUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol } from '@application/protocols/infra';
import { PageParams } from '@application/helpers';

export class GetAllUsersUsecase extends GetAllUsersUsecaseProtocol {
	constructor(tracer: Tracer, private readonly userRepository: DatabaseProtocol.Repositories.Public.User) {
		super(tracer);
	}

	protected validateParams(params: Partial<User.SearchableFields & PageParams.Type<User>>): void {
		User.validate(params);
	}

	protected async main(params: Partial<User.SearchableFields & PageParams.Type<User>>): Promise<GetAllUsersUsecaseProtocol.Result> {
		const pageParams = new PageParams<User>({
			pageNumber: params.pageNumber,
			pageSize: params.pageSize,
			sortBy: params.sortBy,
			sortDirection: params.sortDirection,
		});

		const users = await this.userRepository.getAll({ name: params.name, status: params.status, birthday: params.birthday, pageParams });

		return users;
	}
}
