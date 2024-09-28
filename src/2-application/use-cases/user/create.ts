import { Tracer } from '@domain/app';
import { User } from '@domain/entities';
import { CreateUserUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol } from '@application/protocols/infra';
import { UserAlreadyRegisteredError } from '@application/errors';

export class CreateUserUsecase extends CreateUserUsecaseProtocol {
	constructor(tracer: Tracer, private readonly userRepository: DatabaseProtocol.Repositories.Public.User) {
		super(tracer);
	}

	protected validateParams(params: User.ConstructorParams): void {
		User.validate(params);
	}

	protected async main(params: User.ConstructorParams): Promise<User> {
		const userExists = await this.userRepository.getOne({ email: params.email, cpf: params.cpf, phone: params.phone });

		if (!!userExists) {
			const field = userExists.email === params.email ? 'Email' : userExists.cpf === params.cpf ? 'CPF' : 'Phone';

			throw new UserAlreadyRegisteredError(field);
		}

		const user = new User(params);

		return this.userRepository.create(user);
	}
}
