import { Tracer } from '@domain/app';
import { Invite, User } from '@domain/entities';
import { DatabaseProtocol, EmailServiceProtocol } from '@application/protocols/infra';
import { CreateInviteUsecaseProtocol } from '@application/protocols/use-cases/invite';
import { AlreadyRegisteredError } from '@application/errors';
import { createInviteEmail } from '@application/emails';

export class CreateInviteUsecase extends CreateInviteUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite,
		private readonly userRepository: DatabaseProtocol.Repositories.Public.User,
		private readonly emailService: EmailServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams({ user, ...params }: CreateInviteUsecaseProtocol.Params): void {
		return Invite.validate({ ...params, createdBy: user.id });
	}

	protected async main({ user, ...params }: CreateInviteUsecaseProtocol.Params): Promise<CreateInviteUsecaseProtocol.Result> {
		const userExists = await this.userRepository.getOne({ email: params.email });

		if (userExists !== null) throw new AlreadyRegisteredError(User, 'email');

		const inviteExists = await this.inviteRepository.getOne({ email: params.email });

		if (inviteExists !== null) throw new AlreadyRegisteredError(Invite, 'email');

		const invite = new Invite({ ...params, createdBy: user.id });

		const inviteEmail = createInviteEmail(invite);

		await this.emailService.send(inviteEmail);

		invite.markSent(user);

		return this.inviteRepository.create(invite);
	}
}
