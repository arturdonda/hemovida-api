import { CustomError } from '@domain/app';
import { Invite } from '@domain/entities';

export class InvalidInviteError extends CustomError {
	constructor(invite: Invite) {
		super({ code: 400, message: `Invalid invite: invite is ${invite.status}` });
	}
}
