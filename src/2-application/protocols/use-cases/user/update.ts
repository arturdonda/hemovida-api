import { Usecase } from '@domain/app';
import { User } from '@domain/entities';

export abstract class UpdateUserUsecaseProtocol extends Usecase<UpdateUserUsecaseProtocol.Params, UpdateUserUsecaseProtocol.Result> {}

export namespace UpdateUserUsecaseProtocol {
	export type Params = Partial<Pick<User, User.UniqueFields> & Pick<User, User.UpdatableFields>>;
	export type Result = User;
}
