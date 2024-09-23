import { Usecase } from '@domain/app';

export abstract class NotFoundUsecaseProtocol extends Usecase<NotFoundUsecaseProtocol.Params, NotFoundUsecaseProtocol.Result> {}

export namespace NotFoundUsecaseProtocol {
	export type Params = void;
	export type Result = void;
}
