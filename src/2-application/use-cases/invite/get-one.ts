import { Tracer } from '@domain/app';
import { Invite } from '@domain/entities';
import { DatabaseProtocol } from '@application/protocols/infra';
import { GetOneInviteUsecaseProtocol } from '@application/protocols/use-cases/invite';
import { NotFoundError } from '@application/errors';

export class GetOneInviteUsecase extends GetOneInviteUsecaseProtocol {
	constructor(tracer: Tracer, private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite) {
		super(tracer);
	}

	protected validateParams(params: Partial<Pick<Invite, Invite.UniqueFields>>): void {
		return;
	}

	protected async main({ id }: Partial<Pick<Invite, Invite.UniqueFields>>): Promise<Invite> {
		const invite = await this.inviteRepository.getOne({ id });

		if (invite === null) throw new NotFoundError(Invite);

		return invite;
	}
}
