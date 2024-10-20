import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class RevokeSessionUsecaseProtocol extends Usecase<RevokeSessionUsecaseProtocol.Params, RevokeSessionUsecaseProtocol.Result> {}

export namespace RevokeSessionUsecaseProtocol {
	export type Params = Pick<Session, 'id'> & { userAgent: string };
	export type Result = Session;
}
