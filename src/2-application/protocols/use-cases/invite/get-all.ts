import { Usecase } from '@domain/app';
import { Invite } from '@domain/entities';
import { PageParams, PaginatedResult } from '@application/helpers';

export abstract class GetAllInvitesUsecaseProtocol extends Usecase<GetAllInvitesUsecaseProtocol.Params, GetAllInvitesUsecaseProtocol.Result> {}

export namespace GetAllInvitesUsecaseProtocol {
	export type Params = Partial<Invite.SearchableFields & PageParams.Type<Invite>>;
	export type Result = PaginatedResult<Invite>;
}
