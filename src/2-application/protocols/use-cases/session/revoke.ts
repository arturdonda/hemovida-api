import { Usecase } from '@domain/app';
import { Session, User } from '@domain/entities';

export abstract class RevokeSessionUsecaseProtocol extends Usecase<RevokeSessionUsecaseProtocol.Params, RevokeSessionUsecaseProtocol.Result> {}

export namespace RevokeSessionUsecaseProtocol {
	export type Params = Pick<Session, 'id'> & { user: User };
	export type Result = Session;
}
