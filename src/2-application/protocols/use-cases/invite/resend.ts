import { Usecase } from '@domain/app';
import { Invite, User } from '@domain/entities';

export abstract class ResendInviteUsecaseProtocol extends Usecase<ResendInviteUsecaseProtocol.Params, ResendInviteUsecaseProtocol.Result> {}

export namespace ResendInviteUsecaseProtocol {
	export type Params = Partial<Pick<Invite, 'id'>> & { user: User };
	export type Result = Invite;
}
