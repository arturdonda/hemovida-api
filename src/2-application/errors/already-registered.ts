import { CustomError } from '@domain/app';

export class AlreadyRegisteredError<T> extends CustomError {
	constructor(c: new (...params: any) => T, field: string) {
		super({ code: 400, message: `${c.name} already registered for this ${field}.` });
	}
}
