import { CustomError } from '@domain/app';

export class UserIsInactiveError extends CustomError {
	constructor() {
		super({ code: 400, message: 'User is inactive.' });
	}
}
