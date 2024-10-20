import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class DeleteSessionUsecaseProtocol extends Usecase<DeleteSessionUsecaseProtocol.Params, DeleteSessionUsecaseProtocol.Result> {}

export namespace DeleteSessionUsecaseProtocol {
	export type Params = Pick<Session, 'id'>;
	export type Result = void;
}
