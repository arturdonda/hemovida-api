import { CustomError } from '@domain/app';

export class ProcessNotFoundError extends CustomError {
	constructor(processName: string) {
		super({ code: 500, message: `Process ${processName} not found!` });
	}
}
