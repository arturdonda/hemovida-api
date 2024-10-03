import { UserRepository } from './users';

export interface PublicRepositories {
	User: UserRepository;
}

export namespace PublicRepositories {
	export class User extends UserRepository {}
}
