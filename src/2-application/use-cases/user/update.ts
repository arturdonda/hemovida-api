import { Tracer } from '@domain/app';
import { User } from '@domain/entities';
import { UpdateUserUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol } from '@application/protocols/infra';
import { NotFoundError, UserIsInactiveError, UserIsPendingError } from '@application/errors';

export class UpdateUserUsecase extends UpdateUserUsecaseProtocol {
	constructor(tracer: Tracer, private readonly userRepository: DatabaseProtocol.Repositories.Public.User) {
		super(tracer);
	}

	protected validateParams(params: UpdateUserUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id, ...updatableFields }: UpdateUserUsecaseProtocol.Params): Promise<UpdateUserUsecaseProtocol.Result> {
		const user = await this.userRepository.getOne({ id });

		if (user === null) throw new NotFoundError(User);

		if (user.status === User.Status.Pending) throw new UserIsPendingError();
		if (user.status === User.Status.Inactive) throw new UserIsInactiveError();

		if (updatableFields.firstName) user.firstName = updatableFields.firstName;
		if (updatableFields.surname) user.surname = updatableFields.surname;
		if (updatableFields.preferredName) user.preferredName = updatableFields.preferredName;
		if (updatableFields.phone) user.phone = updatableFields.phone;

		return this.userRepository.update(user);
	}
}
