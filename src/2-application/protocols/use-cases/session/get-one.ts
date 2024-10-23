import { Usecase } from '@domain/app';
import { Session, User } from '@domain/entities';

export abstract class GetOneSessionUsecaseProtocol extends Usecase<GetOneSessionUsecaseProtocol.Params, GetOneSessionUsecaseProtocol.Result> {}

export namespace GetOneSessionUsecaseProtocol {
	export type Params = Partial<Pick<Session, Session.UniqueFields>> & { user: User };
	export type Result = Session;
}
