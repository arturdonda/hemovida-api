import { Usecase } from '@domain/app';
import { User } from '@domain/entities';
import { PageParams, PaginatedResult } from '@application/helpers';

export abstract class GetAllUsersUsecaseProtocol extends Usecase<GetAllUsersUsecaseProtocol.Params, GetAllUsersUsecaseProtocol.Result> {}

export namespace GetAllUsersUsecaseProtocol {
	export type Params = Partial<User.SearchableFields & PageParams.Type<User>>;
	export type Result = PaginatedResult<User>;
}
