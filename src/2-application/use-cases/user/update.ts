import { Tracer } from '@domain/app';
import { User } from '@domain/entities';
import { UpdateUserUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol } from '@application/protocols/infra';
import { NotFoundError, InvalidUserError } from '@application/errors';

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

		if (user.isActive === false) throw new InvalidUserError(user);

		if (updatableFields.firstName) user.firstName = updatableFields.firstName;
		if (updatableFields.surname) user.surname = updatableFields.surname;
		if (updatableFields.preferredName) user.preferredName = updatableFields.preferredName;
		if (updatableFields.phone) user.phone = updatableFields.phone;
		if (updatableFields.password) user.password = updatableFields.password;

		return this.userRepository.update(user);
	}
}
