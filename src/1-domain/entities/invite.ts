import { DbEntity } from './db-entity';
import { User } from './user';

export class Invite extends DbEntity<Invite.Type, Invite.UniqueFields, Invite.SearchableFields, Invite.UpdatableFields> {
	private _firstName: Invite.Type['firstName'];
	private _surname: Invite.Type['surname'];
	private _email: Invite.Type['email'];
	private _status: Invite.Type['status'];
	private _createdBy: Invite.Type['createdBy'];
	private _sentAt: Invite.Type['sentAt'];
	private _sentBy: Invite.Type['sentBy'];
	private _revokedAt: Invite.Type['revokedAt'];
	private _revokedBy: Invite.Type['revokedBy'];
	private _expiresAt: Invite.Type['expiresAt'];

	constructor(params: Invite.ConstructorParams) {
		super();

		this._firstName = params.firstName;
		this._surname = params.surname;
		this._email = params.email;
		this._status = Invite.Status.Created;
		this._createdBy = params.createdBy;
		this._sentAt = null;
		this._sentBy = null;
		this._revokedAt = null;
		this._revokedBy = null;
		this._expiresAt = null;
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

	get createdBy() {
		return this._createdBy;
	}

	get sentAt() {
		return this._sentAt;
	}

	get sentBy() {
		return this._sentBy;
	}

	get revokedAt() {
		return this._revokedAt;
	}

	get revokedBy() {
		return this._revokedBy;
	}

	get expiresAt() {
		return this._expiresAt;
	}

	get isAccepted() {
		return this._status === Invite.Status.Accepted;
	}

	get isExpired() {
		return this._status === Invite.Status.Expired || (this._expiresAt !== null && this._expiresAt >= new Date());
	}

	get isRevoked() {
		return this._status === Invite.Status.Revoked;
	}

	static get lifetime() {
		return process.env.SESSION_LIFETIME_IN_MS;
	}
	//#endregion Getters

	//#region Methods
	markSent(sender: User) {
		const now = new Date();

		this._sentBy = sender.id;
		this._sentAt = now;
		this._updatedAt = now;
		this._status = Invite.Status.Sent;
		this._expiresAt = new Date(now.valueOf() + Invite.lifetime);
	}

	markRevoked(revoker: User) {
		const now = new Date();

		this._revokedBy = revoker.id;
		this._revokedAt = now;
		this._updatedAt = now;
		this._status = Invite.Status.Revoked;
	}
	//#endregion Methods

	//#region Validation
	static validate(params: Invite.ConstructorParams): void {
		return;
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
			createdBy: this.createdBy,
			sentAt: this.sentAt,
			sentBy: this.sentBy,
			revokedAt: this.revokedAt,
			revokedBy: this.revokedBy,
			expiresAt: this.expiresAt,
		};
	}

	fromJSON(data: Invite.Type): Invite {
		const invite = new Invite({
			firstName: data.firstName,
			surname: data.surname,
			email: data.email,
			createdBy: data.createdBy,
		});

		invite._id = data.id;
		invite._createdAt = data.createdAt;
		invite._updatedAt = data.updatedAt;
		invite._status = data.status;
		invite._createdBy = data.createdBy;
		invite._sentAt = data.sentAt;
		invite._sentBy = data.sentBy;
		invite._revokedAt = data.revokedAt;
		invite._revokedBy = data.revokedBy;
		invite._expiresAt = data.expiresAt;

		return invite;
	}
	//#endregion JSON Parse
}
export namespace Invite {
	export type ConstructorParams = Pick<Type, 'firstName' | 'surname' | 'email' | 'createdBy'>;

	export type Type = DbEntity.Type & {
		firstName: string;
		surname: string;
		email: string;
		status: Status;
		createdBy: string;
		sentAt: Date | null;
		sentBy: string | null;
		revokedAt: Date | null;
		revokedBy: string | null;
		expiresAt: Date | null;
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
		createdBy: string;
		sentAt: [Date, Date];
		sentBy: string;
		revokedAt: [Date, Date];
		revokedBy: string;
		expiresAt: [Date, Date];
	};

	export type UpdatableFields = 'updatedAt' | 'status' | 'sentAt' | 'sentBy' | 'revokedAt' | 'revokedBy' | 'expiresAt';
}
