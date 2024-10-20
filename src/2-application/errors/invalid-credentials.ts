import { CustomError } from '@domain/app';

export class InvalidCredentialsError extends CustomError {
	constructor() {
		super({ code: 401, message: 'Invalid email or password' });
	}
}
