import { User } from '@domain/entities';
import { RepositoryProtocol } from '../repository';

export abstract class UserRepositoryProtocol extends RepositoryProtocol<User, User.UniqueFields, User.SearchableFields, User.UpdatableFields> {
	abstract getAll(params: UserRepositoryProtocol.GetAll.Params): UserRepositoryProtocol.GetAll.Result;
	abstract getOne(params: UserRepositoryProtocol.GetOne.Params): UserRepositoryProtocol.GetOne.Result;
	abstract create(params: UserRepositoryProtocol.Create.Params): UserRepositoryProtocol.Create.Result;
	abstract update(params: UserRepositoryProtocol.Update.Params): UserRepositoryProtocol.Update.Result;
	abstract delete(params: UserRepositoryProtocol.Delete.Params): UserRepositoryProtocol.Delete.Result;
}

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
		export type Params = User;
		export type Result = RepositoryProtocol.Create.Result<User>;
	}
	export namespace Update {
		export type Params = RepositoryProtocol.Update.Params<User>;
		export type Result = RepositoryProtocol.Update.Result<User>;
	}
	export namespace Delete {
		export type Params = RepositoryProtocol.Delete.Params<User>;
		export type Result = RepositoryProtocol.Delete.Result;
	}
}
