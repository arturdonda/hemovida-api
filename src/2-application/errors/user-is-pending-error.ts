import { CustomError } from '@domain/app';

export class UserIsPendingError extends CustomError {
	constructor() {
		super({ code: 400, message: 'User is pending.' });
	}
}
