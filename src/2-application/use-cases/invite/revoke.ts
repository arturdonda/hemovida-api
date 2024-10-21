import { Tracer } from '@domain/app';
import { Invite } from '@domain/entities';
import { DatabaseProtocol } from '@application/protocols/infra';
import { RevokeInviteUsecaseProtocol } from '@application/protocols/use-cases/invite';
import { InvalidInviteError, NotFoundError } from '@application/errors';

export class RevokeInviteUsecase extends RevokeInviteUsecaseProtocol {
	constructor(tracer: Tracer, private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite) {
		super(tracer);
	}

	protected validateParams(params: RevokeInviteUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ id, user }: RevokeInviteUsecaseProtocol.Params): Promise<RevokeInviteUsecaseProtocol.Result> {
		const invite = await this.inviteRepository.getOne({ id });

		if (invite === null) throw new NotFoundError(Invite);

		if (invite.isAccepted || invite.isExpired || invite.isRevoked) throw new InvalidInviteError(invite);

		invite.markRevoked(user);

		await this.inviteRepository.update(invite);
	}
}
