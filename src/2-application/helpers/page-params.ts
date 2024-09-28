import { Entity } from '@domain/app';
import { DbEntity } from '@domain/entities';

export class PageParams<T extends DbEntity<any, any, any, any>> extends Entity<PageParams.Type<any>> {
	private readonly DEFAULT_PAGE_NUMBER: PageParams.Type<T>['pageNumber'] = 1;
	private readonly DEFAULT_PAGE_SIZE: PageParams.Type<T>['pageSize'] = 50;
	private readonly DEFAULT_SORT_BY: PageParams.Type<T>['sortBy'] = 'id' as keyof T;
	private readonly DEFAULT_SORT_DIRECTION: PageParams.Type<T>['sortDirection'] = PageParams.SortDirection.DESC;

	private readonly _pageNumber: PageParams.Type<T>['pageNumber'] | undefined;
	private readonly _pageSize: PageParams.Type<T>['pageSize'] | undefined;
	private readonly _sortBy: PageParams.Type<T>['sortBy'] | undefined;
	private readonly _sortDirection: PageParams.Type<T>['sortDirection'] | undefined;

	constructor(params: PageParams.ConstructorParams<T>) {
		super();

		this._pageNumber = params.pageNumber ?? params.default?.pageNumber;
		this._pageSize = params.pageSize ?? params.default?.pageSize;
		this._sortBy = params.sortBy ?? params.default?.sortBy;
		this._sortDirection = params.sortDirection ?? params.default?.sortDirection;
	}

	get pageNumber() {
		return this._pageNumber ?? this.DEFAULT_PAGE_NUMBER;
	}

	get pageSize() {
		return this._pageSize ?? this.DEFAULT_PAGE_SIZE;
	}

	get sortBy() {
		return this._sortBy ?? this.DEFAULT_SORT_BY;
	}

	get sortDirection() {
		return this._sortDirection ?? this.DEFAULT_SORT_DIRECTION;
	}

	toJSON(): PageParams.Type<T> {
		return { pageNumber: this.pageNumber, pageSize: this.pageSize, sortBy: this.sortBy, sortDirection: this.sortDirection };
	}
}

export namespace PageParams {
	export type ConstructorParams<T extends DbEntity<any, any, any, any>> = Partial<Type<T> & { default: Partial<Type<T>> }>;

	export type Type<T extends DbEntity<any, any, any, any>> = {
		pageNumber: number;
		pageSize: number;
		sortBy: keyof T;
		sortDirection: SortDirection;
	};

	export enum SortDirection {
		ASC = 'asc',
		DESC = 'desc',
	}
}
