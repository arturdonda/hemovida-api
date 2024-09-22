import { Entity } from '@domain/app';
import { DbEntity } from '@domain/entities';
import { PageParams } from '@application/helpers';

export class PaginatedResult<T extends DbEntity<any>> extends Entity<PaginatedResult.Type<any>> {
	private _pageParams: PaginatedResult.ConstructorParams<T>['pageParams'];
	private _totalCount: PaginatedResult.ConstructorParams<T>['totalCount'];
	private _data: PaginatedResult.ConstructorParams<T>['data'];

	constructor(params: PaginatedResult.ConstructorParams<T>) {
		super();

		this._pageParams = params.pageParams;
		this._totalCount = PaginatedResult.validateTotalCount(params.totalCount);
		this._data = params.data;
	}

	get pageNumber() {
		return this._pageParams.pageNumber;
	}

	get pageSize() {
		return this._pageParams.pageSize;
	}

	get sortBy() {
		return this._pageParams.sortBy;
	}

	get sortDirection() {
		return this._pageParams.sortDirection;
	}

	get totalCount() {
		return this._totalCount;
	}

	get data() {
		return this._data;
	}

	private static validateTotalCount(totalCount: number) {
		if (totalCount < 0) throw new Error(`Total count must be a non-negative number (received ${totalCount}).`);

		return totalCount;
	}

	toJSON(): PaginatedResult.Type<any> {
		return {
			...this._pageParams.toJSON(),
			totalCount: this.totalCount,
			data: this.data,
		};
	}
}

export namespace PaginatedResult {
	export type ConstructorParams<T extends DbEntity<any>> = { pageParams: PageParams<T>; totalCount: number; data: T[] };

	export type Type<T extends DbEntity<any>> = PageParams.Type<T> & {
		totalCount: number;
		data: T[];
	};
}
