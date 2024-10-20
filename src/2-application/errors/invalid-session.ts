import { CustomError } from '@domain/app';
import { Session } from '@domain/entities';

export class InvalidSessionError extends CustomError {
	constructor(session: Session) {
		super({ code: 400, message: `Invalid session: session is ${session.status}` });
	}
}
