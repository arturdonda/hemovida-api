import { InvalidParamError } from '@domain/errors';
import { DbEntity } from './db-entity';
import { Uuid } from './uuid';

export class Session extends DbEntity<Session.Type, Session.UniqueFields, Session.SearchableFields, Session.UpdatableFields> {
	private _userId: Session.Type['userId'];
	private _status: Session.Type['status'];
	private _refreshToken: Session.Type['refreshToken'];
	private _csrfToken: Session.Type['csrfToken'];
	private _ipAddress: Session.Type['ipAddress'];
	private _expiresAt: Session.Type['expiresAt'];
	private _metadata: Session.Type['metadata'];

	constructor(params: Session.ConstructorParams) {
		super();

		this._userId = params.userId;
		this._status = Session.Status.Active;
		this._refreshToken = Uuid.v4();
		this._csrfToken = Uuid.v4();
		this._ipAddress = Session.validateIpAddress(params.ipAddress);
		this._expiresAt = new Date(this._createdAt.valueOf() + Session.lifetime);
		this._metadata = params.metadata;
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

	get userId() {
		return this._userId;
	}

	get status() {
		return this._status;
	}

	get refreshToken() {
		return this._refreshToken;
	}

	get csrfToken() {
		return this._csrfToken;
	}

	get ipAddress() {
		return this._ipAddress;
	}

	get expiresAt() {
		return this._expiresAt;
	}

	get metadata() {
		return this._metadata;
	}

	get isActive() {
		return this._status === Session.Status.Active;
	}

	get isExpired() {
		return this._status === Session.Status.Expired || this._expiresAt >= new Date();
	}

	get isRevoked() {
		return this._status === Session.Status.Revoked;
	}

	static get lifetime() {
		return process.env.SESSION_LIFETIME_IN_MS;
	}
	//#endregion Getters

	//#region Methods
	update({ ipAddress, metadata }: Pick<Session.Type, 'ipAddress' | 'metadata'>) {
		this._ipAddress = Session.validateIpAddress(ipAddress);
		this._metadata = metadata;

		this._updatedAt = new Date();
	}

	revoke() {
		this._status = Session.Status.Revoked;
		this._updatedAt = new Date();
	}
	//#endregion Methods

	//#region Validation
	static validateIpAddress(ipAddress: unknown): Session.Type['ipAddress'] {
		if (typeof ipAddress !== 'string') throw new InvalidParamError('ipAddress');

		const parts = ipAddress.split('.');

		if (parts.length !== 4) throw new InvalidParamError('ipAddress');

		for (const part of parts) {
			if (part.length === 0 || part.length > 3) throw new InvalidParamError('ipAddress');

			const parsed = +part;

			if (Number.isNaN(parsed)) throw new InvalidParamError('ipAddress');

			if (parsed > 255) throw new InvalidParamError('ipAddress');
		}

		return ipAddress;
	}

	static validate(params: Session.ConstructorParams): void {
		Session.validateIpAddress(params.ipAddress);
	}
	//#endregion Validation

	//#region JSON Parse
	toJSON(): Session.Type {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			userId: this.userId,
			status: this.status,
			refreshToken: this.refreshToken,
			csrfToken: this.csrfToken,
			ipAddress: this.ipAddress,
			expiresAt: this.expiresAt,
			metadata: this.metadata,
		};
	}

	fromJSON(data: Session.Type): Session {
		const session = new Session({
			userId: data.userId,
			ipAddress: data.ipAddress,
			metadata: data.metadata,
		});

		session._id = data.id;
		session._createdAt = data.createdAt;
		session._updatedAt = data.updatedAt;
		session._status = data.status;
		session._refreshToken = data.refreshToken;
		session._csrfToken = data.csrfToken;
		session._expiresAt = data.expiresAt;

		return session;
	}
	//#endregion JSON Parse
}
export namespace Session {
	export type ConstructorParams = Pick<Type, 'userId' | 'ipAddress' | 'metadata'>;

	export type Type = DbEntity.Type & {
		userId: string;
		status: Status;
		refreshToken: string;
		csrfToken: string;
		ipAddress: string;
		expiresAt: Date;
		metadata: Metadata;
	};

	export enum Status {
		Active = 'active',
		Expired = 'expired',
		Revoked = 'revoked',
	}

	export type Metadata = {
		userAgent: string;
		browser: string;
		device: { type: string; os: { name: string; version: string } };
		geolocation: {
			lat: number;
			lon: number;
			city: string;
			region: { code: string; name: string };
			country: { code: string; name: string };
		};
	};

	export type UniqueFields = 'id' | 'refreshToken' | 'csrfToken';

	export type SearchableFields = {
		id: string;
		userId: string;
		status: Status;
		refreshToken: string;
		expiresAt: [Date, Date];
		deviceType: string;
	};

	export type UpdatableFields = 'updatedAt' | 'status' | 'ipAddress' | 'metadata';
}
