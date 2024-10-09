import { Usecase } from '@domain/app';
import { Invite } from '@domain/entities';

export abstract class UpdateInviteUsecaseProtocol extends Usecase<UpdateInviteUsecaseProtocol.Params, UpdateInviteUsecaseProtocol.Result> {}

export namespace UpdateInviteUsecaseProtocol {
	export type Params = Partial<Pick<Invite, Invite.UniqueFields> & Pick<Invite, Invite.UpdatableFields>>;
	export type Result = Invite;
}
