import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class DeleteSessionUsecaseProtocol extends Usecase<DeleteSessionUsecaseProtocol.Params, DeleteSessionUsecaseProtocol.Result> {}

export namespace DeleteSessionUsecaseProtocol {
	export type Params = Partial<Pick<Session, Session.UniqueFields>>;
	export type Result = void;
}
