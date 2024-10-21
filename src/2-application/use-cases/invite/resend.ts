import { Tracer } from '@domain/app';
import { Invite } from '@domain/entities';
import { DatabaseProtocol, EmailServiceProtocol } from '@application/protocols/infra';
import { ResendInviteUsecaseProtocol } from '@application/protocols/use-cases/invite';
import { InvalidInviteError, NotFoundError } from '@application/errors';
import { createInviteEmail } from '@application/emails';

export class ResendInviteUsecase extends ResendInviteUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite,
		private readonly emailService: EmailServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams(params: ResendInviteUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id, user }: ResendInviteUsecaseProtocol.Params): Promise<ResendInviteUsecaseProtocol.Result> {
		const invite = await this.inviteRepository.getOne({ id });

		if (invite === null) throw new NotFoundError(Invite);

		if (invite.isAccepted || invite.isExpired || invite.isRevoked) throw new InvalidInviteError(invite);

		const inviteEmail = createInviteEmail(invite);

		await this.emailService.send(inviteEmail);

		invite.markSent(user);

		return this.inviteRepository.update(invite);
	}
}
