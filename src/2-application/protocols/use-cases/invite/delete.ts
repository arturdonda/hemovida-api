import { Usecase } from '@domain/app';
import { Invite } from '@domain/entities';

export abstract class DeleteInviteUsecaseProtocol extends Usecase<DeleteInviteUsecaseProtocol.Params, DeleteInviteUsecaseProtocol.Result> {}

export namespace DeleteInviteUsecaseProtocol {
	export type Params = Partial<Pick<Invite, Invite.UniqueFields>>;
	export type Result = void;
}
