import { DbEntity } from '@domain/entities';
import { PageParams, PaginatedResult } from '@application/helpers';

export abstract class RepositoryProtocol<
	T extends DbEntity<any, UniqueFields, SearchableFields, UpdatableFields>,
	UniqueFields extends keyof T,
	SearchableFields extends Record<string, unknown>,
	UpdatableFields extends keyof T
> {
	abstract getAll(params: RepositoryProtocol.GetAll.Params<T, SearchableFields>): RepositoryProtocol.GetAll.Result<T>;
	abstract getOne(params: RepositoryProtocol.GetOne.Params<T, UniqueFields>): RepositoryProtocol.GetOne.Result<T>;
	abstract create(params: RepositoryProtocol.Create.Params<T>): RepositoryProtocol.Create.Result<T>;
	abstract update(params: RepositoryProtocol.Update.Params<T, UpdatableFields>): RepositoryProtocol.Update.Result<T>;
	abstract delete(params: RepositoryProtocol.Delete.Params<T, UniqueFields>): RepositoryProtocol.Delete.Result;
}

export namespace RepositoryProtocol {
	export namespace GetAll {
		export type Params<T extends DbEntity<any, any, any, any>, SearchableFields extends Record<string, unknown>> = {
			pageParams: PageParams<T>;
		} & Partial<SearchableFields>;
		export type Result<T extends DbEntity<any, any, any, any>> = Promise<PaginatedResult<T>>;
	}

	export namespace GetOne {
		export type Params<T extends DbEntity<any, any, any, any>, UniqueFields extends keyof T> = Partial<Pick<T, UniqueFields>>;
		export type Result<T extends DbEntity<any, any, any, any>> = Promise<T | null>;
	}

	export namespace Create {
		export type Params<T extends DbEntity<any, any, any, any>> = T;
		export type Result<T extends DbEntity<any, any, any, any>> = Promise<T>;
	}

	export namespace Update {
		export type Params<T extends DbEntity<any, any, any, any>, UpdatableFields extends keyof T> = Pick<T, UpdatableFields>;
		export type Result<T extends DbEntity<any, any, any, any>> = Promise<T>;
	}

	export namespace Delete {
		export type Params<T extends DbEntity<any, any, any, any>, UniqueFields extends keyof T> = Partial<Pick<T, UniqueFields>>;
		export type Result = Promise<void>;
	}
}
