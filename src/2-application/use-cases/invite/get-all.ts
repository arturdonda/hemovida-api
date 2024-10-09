import { Tracer } from '@domain/app';
import { Invite } from '@domain/entities';
import { PageParams } from '@application/helpers';
import { DatabaseProtocol } from '@application/protocols/infra';
import { GetAllInvitesUsecaseProtocol } from '@application/protocols/use-cases/invite';

export class GetAllInvitesUsecase extends GetAllInvitesUsecaseProtocol {
	constructor(tracer: Tracer, private readonly inviteRepository: DatabaseProtocol.Repositories.Public.Invite) {
		super(tracer);
	}

	protected validateParams(params: Partial<Invite.SearchableFields & PageParams.Type<Invite>>): void {
		return;
	}

	protected main(params: Partial<Invite.SearchableFields & PageParams.Type<Invite>>): Promise<GetAllInvitesUsecaseProtocol.Result> {
		const { pageNumber, pageSize, sortBy, sortDirection, ...searchableFields } = params;

		const pageParams = new PageParams<Invite>({ pageNumber, pageSize, sortBy, sortDirection });

		return this.inviteRepository.getAll({ pageParams, ...searchableFields });
	}
}
