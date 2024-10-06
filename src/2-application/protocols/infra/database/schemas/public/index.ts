import { InviteRepositoryProtocol } from './invite';
import { SessionRepositoryProtocol } from './session';
import { UserRepositoryProtocol } from './user';

export interface PublicSchema {
	Invite: InviteRepositoryProtocol;
	Session: SessionRepositoryProtocol;
	User: UserRepositoryProtocol;
}

export namespace PublicSchema {
	export type Invite = InviteRepositoryProtocol;
	export type Session = SessionRepositoryProtocol;
	export type User = UserRepositoryProtocol;
}
