import { CustomError } from '@domain/app';

export class UserAlreadyRegisteredError extends CustomError {
	constructor(field: string) {
		super({ code: 400, message: `User already registered with this ${field}.` });
	}
}
