import { DbEntity } from './db-entity';

export class Invite extends DbEntity<Invite.Type, Invite.UniqueFields, Invite.SearchableFields, Invite.UpdatableFields> {
	private _firstName: Invite.Type['firstName'];
	private _surname: Invite.Type['surname'];
	private _email: Invite.Type['email'];
	private _status: Invite.Type['status'];
	private _invitedBy: Invite.Type['invitedBy'];
	private _expiresAt: Invite.Type['expiresAt'];

	constructor(params: Invite.ConstructorParams) {
		super();

		this._firstName = params.firstName;
		this._surname = params.surname;
		this._email = params.email;
		this._status = Invite.Status.Created;
		this._invitedBy = params.invitedBy;
		this._expiresAt = new Date(this._createdAt.valueOf() + Invite.lifetime);
	}

	//#region Getters
	get id() {
		return this._id;
	}

	get createdAt() {
		return this._createdAt;
	}

	get updatedAt() {
		return this._updatedAt;
	}
	get firstName() {
		return this._firstName;
	}

	get surname() {
		return this._surname;
	}

	get email() {
		return this._email;
	}

	get status() {
		return this._status;
	}

	get invitedBy() {
		return this._invitedBy;
	}

	get expiresAt() {
		return this._expiresAt;
	}

	static get lifetime() {
		return process.env.SESSION_LIFETIME_IN_MS;
	}
	//#endregion Getters

	//#region Setters
	set status(status: Invite.Status) {
		this._status = status;
		this._updatedAt = new Date();
	}
	//#endregion Setters

	//#region Validation
	static validate(data: unknown): void {
		throw new Error('Not implemented yet!');
	}
	//#endregion Validation

	//#region JSON Parse
	toJSON(): Invite.Type {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			firstName: this.firstName,
			surname: this.surname,
			email: this.email,
			status: this.status,
			invitedBy: this.invitedBy,
			expiresAt: this.expiresAt,
		};
	}

	fromJSON(data: Invite.Type): Invite {
		const invite = new Invite({
			firstName: data.firstName,
			surname: data.surname,
			email: data.email,
			invitedBy: data.invitedBy,
		});

		invite._id = data.id;
		invite._createdAt = data.createdAt;
		invite._updatedAt = data.updatedAt;
		invite._status = data.status;
		invite._expiresAt = data.expiresAt;

		return invite;
	}
	//#endregion JSON Parse
}
export namespace Invite {
	export type ConstructorParams = Pick<Type, 'firstName' | 'surname' | 'email' | 'invitedBy'>;

	export type Type = DbEntity.Type & {
		firstName: string;
		surname: string;
		email: string;
		status: Status;
		invitedBy: string;
		expiresAt: Date;
	};

	export enum Status {
		Created = 'created',
		Sent = 'sent',
		Accepted = 'accepted',
		Expired = 'expired',
		Revoked = 'revoked',
	}

	export type UniqueFields = 'id' | 'email';

	export type SearchableFields = {
		id: string;
		name: string;
		email: string;
		status: Status;
		invitedBy: string;
	};

	export type UpdatableFields = 'status' | 'updatedAt';
}
