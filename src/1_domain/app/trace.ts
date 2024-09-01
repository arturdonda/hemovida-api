import { Entity } from '.';

export class Trace extends Entity<Trace.Type> {
	private _process: Trace.Type['process'];
	private _startedAt: Trace.Type['startedAt'];
	private _finishedAt: Trace.Type['finishedAt'];
	private _error: Trace.Type['error'];

	constructor(process: string) {
		super();

		this._process = process;
		this._startedAt = new Date();
		this._finishedAt = undefined;
		this._error = undefined;
	}

	//#region Getters
	get process() {
		return this._process;
	}

	get startedAt() {
		return this._startedAt;
	}

	get finishedAt() {
		return this._finishedAt;
	}

	get error() {
		return this._error;
	}

	get duration() {
		if (this._finishedAt === undefined) return -1;

		return this._finishedAt.valueOf() - this._startedAt.valueOf();
	}
	//#endregion Getters

	hasFinished() {
		return !!this.finishedAt;
	}

	hasFailed() {
		return !!this.error;
	}

	setFinished(error?: Error) {
		this._finishedAt = new Date();
		this._error = error;
	}

	toJSON(): Trace.Type {
		return {
			process: this.process,
			startedAt: this.startedAt,
			finishedAt: this.finishedAt,
			duration: this.duration,
			error: this.error,
		};
	}
}

export namespace Trace {
	export type Type = {
		process: string;
		startedAt: Date;
		finishedAt: Date | undefined;
		duration: number;
		error: Error | undefined;
	};
}
