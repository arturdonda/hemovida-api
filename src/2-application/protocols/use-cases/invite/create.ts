import { Usecase } from '@domain/app';
import { Invite, User } from '@domain/entities';

export abstract class CreateInviteUsecaseProtocol extends Usecase<CreateInviteUsecaseProtocol.Params, CreateInviteUsecaseProtocol.Result> {}

export namespace CreateInviteUsecaseProtocol {
	export type Params = Omit<Invite.ConstructorParams, 'invitedBy'> & { user: User };
	export type Result = Invite;
}
