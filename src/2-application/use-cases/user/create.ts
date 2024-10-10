import { Tracer } from '@domain/app';
import { User } from '@domain/entities';
import { InvalidParamError } from '@domain/errors';
import { CreateUserUsecaseProtocol } from '@application/protocols/use-cases/user';
import { DatabaseProtocol, HashServiceProtocol } from '@application/protocols/infra';
import { InvalidInviteError, NotFoundError, AlreadyRegisteredError } from '@application/errors';

export class CreateUserUsecase extends CreateUserUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite,
		private readonly userRepository: DatabaseProtocol.Repositories.Public.User,
		private readonly hashService: HashServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams({ inviteId, ...userParams }: CreateUserUsecaseProtocol.Params): void {
		return User.validate(userParams);
	}

	protected async main({ inviteId, ...userParams }: CreateUserUsecaseProtocol.Params): Promise<CreateUserUsecaseProtocol.Result> {
		const invite = await this.inviteRepository.getOne({ id: inviteId });

		if (invite === null) throw new NotFoundError('Invite');

		if (invite.isValid === false) throw new InvalidInviteError(invite);

		if (invite.email !== userParams.email) throw new InvalidParamError('email', 'must be the same as the invite.');

		await this.checkIfUserAlreadyRegistered({ cpf: userParams.cpf, email: userParams.email, phone: userParams.phone });

		const user = new User({ ...userParams, password: this.hashService.hash(userParams.password) });

		return this.userRepository.create(user);
	}

	private async checkIfUserAlreadyRegistered({ cpf, email, phone }: Pick<CreateUserUsecaseProtocol.Params, 'cpf' | 'email' | 'phone'>) {
		const user = await this.userRepository.getOne({ cpf, email, phone });

		if (user === null) return;

		if (user.cpf === cpf) throw new AlreadyRegisteredError('User', 'cpf');
		if (user.email === email) throw new AlreadyRegisteredError('User', 'email');

		throw new AlreadyRegisteredError('User', 'phone');
	}
}
