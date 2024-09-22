import { User } from '@domain/entities';
import { RepositoryProtocol } from '../repository';

export abstract class UserRepositoryProtocol extends RepositoryProtocol<User> {}

export namespace UserRepositoryProtocol {
	export type UniqueFields = 'id' | 'cpf' | 'email';

	export type UpdatableFields = 'firstName' | 'surname' | 'preferredName' | 'phone' | 'password' | 'birthday' | 'status' | 'updatedAt';

	export type SearchableFields = {
		name: string;
		birthday: [Date, Date];
		status: User.Status;
	};

	export namespace GetAll {
		export type Params = RepositoryProtocol.GetAll.Params<User, SearchableFields>;
		export type Result = RepositoryProtocol.GetAll.Result<User>;
	}

	export namespace GetOne {
		export type Params = RepositoryProtocol.GetOne.Params<User, UniqueFields>;
		export type Result = RepositoryProtocol.GetOne.Result<User>;
	}

	export namespace Create {
		export type Params = RepositoryProtocol.Create.Params<User>;
		export type Result = RepositoryProtocol.Create.Result<User>;
	}

	export namespace Update {
		export type Params = RepositoryProtocol.Update.Params<User, UpdatableFields>;
		export type Result = RepositoryProtocol.Update.Result<User>;
	}

	export namespace Delete {
		export type Params = RepositoryProtocol.Delete.Params<User, UniqueFields>;
		export type Result = RepositoryProtocol.Delete.Result;
	}
}
