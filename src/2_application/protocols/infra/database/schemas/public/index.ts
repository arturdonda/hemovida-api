import { UserRepositoryProtocol } from './user';

export interface PublicSchema {
	User: UserRepositoryProtocol;
}

export namespace PublicSchema {
	export type User = UserRepositoryProtocol;
}
