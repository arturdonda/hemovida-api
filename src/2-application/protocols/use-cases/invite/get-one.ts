import { Usecase } from '@domain/app';
import { Invite } from '@domain/entities';

export abstract class GetOneInviteUsecaseProtocol extends Usecase<GetOneInviteUsecaseProtocol.Params, GetOneInviteUsecaseProtocol.Result> {}

export namespace GetOneInviteUsecaseProtocol {
	export type Params = Partial<Pick<Invite, Invite.UniqueFields>>;
	export type Result = Invite;
}
