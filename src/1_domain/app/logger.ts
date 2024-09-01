export class Logger {
	constructor(private readonly prefix: string) {}

	log(...args: any[]) {
		console.log(...this.formatMessage(Logger.LogLevel.INFO, ...args));
	}

	error(label: string, error: Error) {
		console.log(...this.formatMessage(Logger.LogLevel.ERROR, label, error.message));
		console.error(error);
	}

	private formatMessage(logLevel: Logger.LogLevel, ...args: any[]) {
		return [new Date().toISOString(), `[${logLevel}]`, `[${this.prefix}]`, ...args];
	}
}

export namespace Logger {
	export const LogLevel = {
		INFO: 'INFO',
		ERROR: 'ERROR',
	} as const;

	export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
}
