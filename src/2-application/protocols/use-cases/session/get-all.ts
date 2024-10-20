import { Usecase } from '@domain/app';
import { Session, User } from '@domain/entities';
import { PageParams, PaginatedResult } from '@application/helpers';

export abstract class GetAllSessionsUsecaseProtocol extends Usecase<GetAllSessionsUsecaseProtocol.Params, GetAllSessionsUsecaseProtocol.Result> {}

export namespace GetAllSessionsUsecaseProtocol {
	export type Params = Partial<Session.SearchableFields & PageParams.Type<Session>> & { user: User };
	export type Result = PaginatedResult<Session>;
}
