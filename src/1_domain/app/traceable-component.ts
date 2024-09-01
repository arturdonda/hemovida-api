import { Tracer } from '.';

export abstract class TraceableComponent<Params, Result> {
	protected abstract main(params: Params): Promise<Result>;

	constructor(private readonly tracer: Tracer) {}

	protected log(...args: any[]) {
		this.tracer.logger.log(...args);
	}

	protected error(label: string, error: Error) {
		this.tracer.logger.error(label, error);
	}

	exec(params: Params): Promise<Result> {
		return this.tracer.traceProcess(this.constructor.name, () => this.main(params));
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
