import { Usecase } from '@domain/app';
import { User } from '@domain/entities';

export abstract class DeleteUserUsecaseProtocol extends Usecase<DeleteUserUsecaseProtocol.Params, DeleteUserUsecaseProtocol.Result> {}

export namespace DeleteUserUsecaseProtocol {
	export type Params = Partial<Pick<User, User.UniqueFields>>;
	export type Result = void;
}
