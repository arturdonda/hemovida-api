import { Usecase } from '@domain/app';
import { User } from '@domain/entities';

export abstract class GetOneUserUsecaseProtocol extends Usecase<GetOneUserUsecaseProtocol.Params, GetOneUserUsecaseProtocol.Result> {}

export namespace GetOneUserUsecaseProtocol {
	export type Params = Partial<Pick<User, User.UniqueFields>>;
	export type Result = User | null;
}
