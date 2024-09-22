import { Usecase } from '@domain/app';

export abstract class IHealthCheckUsecase extends Usecase<IHealthCheckUsecase.Params, IHealthCheckUsecase.Result> {}

export namespace IHealthCheckUsecase {
	export type Params = void;
	export type Result = { env: string; version: string };
}
