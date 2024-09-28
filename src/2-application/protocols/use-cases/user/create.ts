import { Usecase } from '@domain/app';
import { User } from '@domain/entities';

export abstract class CreateUserUsecaseProtocol extends Usecase<CreateUserUsecaseProtocol.Params, CreateUserUsecaseProtocol.Result> {}

export namespace CreateUserUsecaseProtocol {
	export type Params = User.ConstructorParams;
	export type Result = User;
}
