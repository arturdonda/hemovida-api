import { Tracer } from '@domain/app';
import { DeleteUserUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol } from '@application/protocols/infra';
import { NotFoundError } from '@application/errors';
import { User } from '@domain/entities';

export class DeleteUserUsecase extends DeleteUserUsecaseProtocol {
	constructor(tracer: Tracer, private readonly userRepository: DatabaseProtocol.Repositories.Public.User) {
		super(tracer);
	}

	protected validateParams(params: DeleteUserUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id }: DeleteUserUsecaseProtocol.Params): Promise<DeleteUserUsecaseProtocol.Result> {
		const user = await this.userRepository.getOne({ id });

		if (user === null) throw new NotFoundError(User);

		return this.userRepository.delete(user);
	}
}
