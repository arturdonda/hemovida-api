import { Tracer } from '@domain/app';
import { Invite } from '@domain/entities';
import { DatabaseProtocol, EmailServiceProtocol } from '@application/protocols/infra';
import { UpdateInviteUsecaseProtocol } from '@application/protocols/use-cases/invite';
import { InvalidInviteError, NotFoundError } from '@application/errors';
import { createInviteEmail } from '@application/emails';

export class UpdateInviteUsecase extends UpdateInviteUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite,
		private readonly emailService: EmailServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams(params: UpdateInviteUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id, action, user }: UpdateInviteUsecaseProtocol.Params): Promise<UpdateInviteUsecaseProtocol.Result> {
		const invite = await this.inviteRepository.getOne({ id });

		if (invite === null) throw new NotFoundError(Invite);

		if (invite.isAccepted || invite.isExpired || invite.isRevoked) throw new InvalidInviteError(invite);

		if (action === 'send') {
			const inviteEmail = createInviteEmail(invite);

			await this.emailService.send(inviteEmail);

			invite.markSent(user);
		} else {
			invite.markRevoked(user);
		}

		return this.inviteRepository.update(invite);
	}
}
