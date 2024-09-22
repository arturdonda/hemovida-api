import { TraceableComponent } from '@domain/app';

export abstract class Usecase<Params, Result> extends TraceableComponent<Params, Result> {
	protected abstract validateParams(params: Params): void;
}
