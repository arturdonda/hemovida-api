import { Usecase } from '@domain/app';
import { Invite, User } from '@domain/entities';

export abstract class RevokeInviteUsecaseProtocol extends Usecase<RevokeInviteUsecaseProtocol.Params, RevokeInviteUsecaseProtocol.Result> {}

export namespace RevokeInviteUsecaseProtocol {
	export type Params = Partial<Pick<Invite, 'id'>> & { user: User };
	export type Result = void;
}
