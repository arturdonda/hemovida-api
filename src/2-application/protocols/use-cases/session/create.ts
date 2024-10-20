import { Usecase } from '@domain/app';
import { Session, User } from '@domain/entities';

export abstract class CreateSessionUsecaseProtocol extends Usecase<CreateSessionUsecaseProtocol.Params, CreateSessionUsecaseProtocol.Result> {}

export namespace CreateSessionUsecaseProtocol {
	export type Params = Pick<Session, 'ipAddress'> & { userAgent: string; user: User };
	export type Result = Session;
}
