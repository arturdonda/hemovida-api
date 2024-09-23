import { User } from '@domain/entities';
import { RepositoryProtocol } from '../repository';

export abstract class UserRepositoryProtocol extends RepositoryProtocol<User> {}

export namespace UserRepositoryProtocol {
	export namespace GetAll {
		export type Params = RepositoryProtocol.GetAll.Params<User, User.SearchableFields>;
		export type Result = RepositoryProtocol.GetAll.Result<User>;
	}

	export namespace GetOne {
		export type Params = RepositoryProtocol.GetOne.Params<User, User.UniqueFields>;
		export type Result = RepositoryProtocol.GetOne.Result<User>;
	}

	export namespace Create {
		export type Params = RepositoryProtocol.Create.Params<User>;
		export type Result = RepositoryProtocol.Create.Result<User>;
	}

	export namespace Update {
		export type Params = RepositoryProtocol.Update.Params<User, User.UpdatableFields>;
		export type Result = RepositoryProtocol.Update.Result<User>;
	}

	export namespace Delete {
		export type Params = RepositoryProtocol.Delete.Params<User, User.UniqueFields>;
		export type Result = RepositoryProtocol.Delete.Result;
	}
}
