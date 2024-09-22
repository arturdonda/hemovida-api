import { DbEntity } from '@domain/entities';
import { PageParams, PaginatedResult } from '@application/helpers';

export abstract class RepositoryProtocol<T extends DbEntity<any>> {
	abstract getAll(params: RepositoryProtocol.GetAll.Params<T, Record<string, unknown>>): RepositoryProtocol.GetAll.Result<T>;
	abstract getOne(params: RepositoryProtocol.GetOne.Params<T, keyof T>): RepositoryProtocol.GetOne.Result<T>;
	abstract create(params: RepositoryProtocol.Create.Params<T>): RepositoryProtocol.Create.Result<T>;
	abstract update(params: RepositoryProtocol.Update.Params<T, keyof T>): RepositoryProtocol.Update.Result<T>;
	abstract delete(params: RepositoryProtocol.Delete.Params<T, keyof T>): RepositoryProtocol.Delete.Result;
}

export namespace RepositoryProtocol {
	export namespace GetAll {
		export type Params<T extends DbEntity<any>, SearchableFields extends Record<string, unknown>> = PageParams<T> & Partial<SearchableFields>;
		export type Result<T extends DbEntity<any>> = Promise<PaginatedResult<T>>;
	}

	export namespace GetOne {
		export type Params<T extends DbEntity<any>, UniqueFields extends keyof T> = Partial<Pick<T, UniqueFields>>;
		export type Result<T extends DbEntity<any>> = Promise<T | null>;
	}

	export namespace Create {
		export type Params<T extends DbEntity<any>> = T;
		export type Result<T extends DbEntity<any>> = Promise<T>;
	}

	export namespace Update {
		export type Params<T extends DbEntity<any>, UpdatableFields extends keyof T> = Pick<T, UpdatableFields>;
		export type Result<T extends DbEntity<any>> = Promise<T>;
	}

	export namespace Delete {
		export type Params<T extends DbEntity<any>, UniqueFields extends keyof T> = Partial<Pick<T, UniqueFields>>;
		export type Result = Promise<void>;
	}
}
