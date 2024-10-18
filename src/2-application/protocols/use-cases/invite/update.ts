import { Usecase } from '@domain/app';
import { Invite, User } from '@domain/entities';

export abstract class UpdateInviteUsecaseProtocol extends Usecase<UpdateInviteUsecaseProtocol.Params, UpdateInviteUsecaseProtocol.Result> {}

export namespace UpdateInviteUsecaseProtocol {
	export type Params = Partial<Pick<Invite, Invite.UniqueFields>> & { action: 'send' | 'revoke'; user: User };
	export type Result = Invite;
}
