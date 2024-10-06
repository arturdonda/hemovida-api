import { InviteRepository } from './invites';
import { SessionRepository } from './sessions';
import { UserRepository } from './users';

export interface PublicRepositories {
	Invite: InviteRepository;
	Session: SessionRepository;
	User: UserRepository;
}

export namespace PublicRepositories {
	export class Invite extends InviteRepository {}
	export class Session extends SessionRepository {}
	export class User extends UserRepository {}
}
