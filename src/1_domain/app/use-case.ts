import { TraceableComponent } from '.';

export abstract class Usecase<Params, Result> extends TraceableComponent<Params, Result> {
	protected abstract validateParams(params: Params): void;
}
