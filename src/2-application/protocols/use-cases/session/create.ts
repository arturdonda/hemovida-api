import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class CreateSessionUsecaseProtocol extends Usecase<CreateSessionUsecaseProtocol.Params, CreateSessionUsecaseProtocol.Result> {}

export namespace CreateSessionUsecaseProtocol {
	export type Params = Session.ConstructorParams;
	export type Result = Session;
}
