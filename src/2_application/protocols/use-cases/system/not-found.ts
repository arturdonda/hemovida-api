import { Usecase } from '@domain/app';

export abstract class INotFoundUsecase extends Usecase<INotFoundUsecase.Params, INotFoundUsecase.Result> {}

export namespace INotFoundUsecase {
	export type Params = void;
	export type Result = void;
}
