import { Usecase } from '@domain/app';
import { Invite, User } from '@domain/entities';

export abstract class CreateUserUsecaseProtocol extends Usecase<CreateUserUsecaseProtocol.Params, CreateUserUsecaseProtocol.Result> {}

export namespace CreateUserUsecaseProtocol {
	export type Params = User.ConstructorParams & { inviteId: Invite['id'] };
	export type Result = User;
}
