import { CustomError } from '@domain/app';
import { User } from '@domain/entities';

export class InvalidUserError extends CustomError {
	constructor(user: User) {
		super({ code: 400, message: `Invalid user: user is ${user.status}` });
	}
}
