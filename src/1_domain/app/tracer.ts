import { Entity, Logger, Trace } from '@domain/app';
import { Uuid } from '@domain/entities';
import { ProcessNotFoundError } from '@domain/errors';

export class Tracer extends Entity<Tracer.Type> {
	readonly uuid: string;
	readonly logger: Logger;
	readonly traceHistory: Map<string, Trace>;

	constructor(private readonly logTraces?: boolean) {
		super();

		this.uuid = Uuid.generate();
		this.logger = new Logger(this.uuid);
		this.traceHistory = new Map<string, Trace>();
	}

	async traceProcess<T>(processName: string, process: () => Promise<T>): Promise<T> {
		this.startTrace(processName);

		try {
			const processResult: T = await process();

			this.finishTrace(processName);

			return processResult;
		} catch (error: any) {
			this.finishTrace(processName, error);

			throw error;
		}
	}

	private startTrace(processName: string) {
		const trace = new Trace(processName);

		this.traceHistory.set(processName, trace);

		if (!this.logTraces) return;

		this.logger.log(processName, `Process started at ${trace.startedAt.toISOString()}`);
	}

	private finishTrace(processName: string, error?: Error) {
		if (!this.traceHistory.has(processName)) throw new ProcessNotFoundError(processName);

		const trace = this.traceHistory.get(processName)!;

		trace.setFinished();

		this.traceHistory.set(processName, trace);

		if (!this.logTraces) return;

		if (error) this.logger.error(`Error at ${trace.finishedAt?.toISOString()}`, error);

		this.logger.log(processName, `Process finished at ${trace.startedAt.toISOString()}`);
	}

	toJSON(): Tracer.Type {
		return { uuid: this.uuid, traceHistory: [...this.traceHistory.values()] };
		// return { uuid: this.uuid, traceHistory: [...this.traceHistory.values()].map(trace => trace.toJSON()) };
	}
}

export namespace Tracer {
	export type Type = {
		uuid: string;
		traceHistory: Trace.Type[];
	};
}
