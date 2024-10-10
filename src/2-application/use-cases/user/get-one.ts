import { Tracer } from '@domain/app';
import { GetOneUserUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol } from '@application/protocols/infra';
import { NotFoundError } from '@application/errors';
import { User } from '@domain/entities';

export class GetOneUserUsecase extends GetOneUserUsecaseProtocol {
	constructor(tracer: Tracer, private readonly userRepository: DatabaseProtocol.Repositories.Public.User) {
		super(tracer);
	}

	protected validateParams(params: GetOneUserUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id }: GetOneUserUsecaseProtocol.Params): Promise<GetOneUserUsecaseProtocol.Result> {
		const user = await this.userRepository.getOne({ id });

		if (user === null) throw new NotFoundError(User);

		return user;
	}
}
