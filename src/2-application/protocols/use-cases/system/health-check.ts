import { Usecase } from '@domain/app';

export abstract class HealthCheckUsecaseProtocol extends Usecase<HealthCheckUsecaseProtocol.Params, HealthCheckUsecaseProtocol.Result> {}

export namespace HealthCheckUsecaseProtocol {
	export type Params = void;
	export type Result = { env: string; version: string };
}
