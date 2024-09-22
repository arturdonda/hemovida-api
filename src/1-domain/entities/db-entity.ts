import { Entity } from '@domain/app';
import { Uuid } from '@domain/entities';

export abstract class DbEntity<T extends DbEntity.Type> extends Entity<T> {
	protected _id: DbEntity.Type['id'];
	protected _createdAt: DbEntity.Type['createdAt'];
	protected _updatedAt: DbEntity.Type['updatedAt'];

	constructor() {
		super();

		this._id = Uuid.generate();
		this._createdAt = new Date();
		this._updatedAt = this._createdAt;
	}

	static fromJSON(data: any): any {
		throw new Error('Static method "fromJSON" must be implemented by the subclass!');
	}
}

export namespace DbEntity {
	export type Type = { id: string; createdAt: Date; updatedAt: Date };
}
