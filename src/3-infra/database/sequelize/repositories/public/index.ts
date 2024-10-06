import { SessionRepository } from './sessions';
import { UserRepository } from './users';

export interface PublicRepositories {
	Session: SessionRepository;
	User: UserRepository;
}

export namespace PublicRepositories {
	export class Session extends SessionRepository {}
	export class User extends UserRepository {}
}
