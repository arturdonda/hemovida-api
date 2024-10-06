import { Usecase } from '@domain/app';
import { Invite } from '@domain/entities';

export abstract class CreateInviteUsecaseProtocol extends Usecase<CreateInviteUsecaseProtocol.Params, CreateInviteUsecaseProtocol.Result> {}

export namespace CreateInviteUsecaseProtocol {
	export type Params = Invite.ConstructorParams;
	export type Result = Invite;
}
