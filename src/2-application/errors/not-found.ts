import { CustomError } from '@domain/app';

export class NotFoundError<T> extends CustomError {
	constructor(c: new (...params: any) => T) {
		super({ code: 400, message: `${c.name} not found` });
	}
}
