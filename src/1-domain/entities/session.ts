import { InvalidParamError } from '@domain/errors';
import { DbEntity } from './db-entity';
import { Uuid } from './uuid';

export class Session extends DbEntity<Session.Type, Session.UniqueFields, Session.SearchableFields, Session.UpdatableFields> {
	private _userId: Session.Type['userId'];
	private _refreshToken: Session.Type['refreshToken'];
	private _csrfToken: Session.Type['csrfToken'];
	private _ipAddress: Session.Type['ipAddress'];
	private _userAgent: Session.Type['userAgent'];
	private _expiresAt: Session.Type['expiresAt'];
	private _lastUsedAt: Session.Type['lastUsedAt'];
	private _isRevoked: Session.Type['isRevoked'];

	constructor(params: Session.ConstructorParams) {
		super();

		this._userId = params.userId;
		this._refreshToken = Uuid.v4();
		this._csrfToken = Uuid.v4();
		this._ipAddress = Session.validateIpAddress(params.ipAddress);
		this._userAgent = params.userAgent;
		this._expiresAt = new Date(this._createdAt.valueOf() + Session.lifetime);
		this._lastUsedAt = this._createdAt;
		this._isRevoked = false;
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

	get refreshToken() {
		return this._refreshToken;
	}

	get csrfToken() {
		return this._csrfToken;
	}

	get ipAddress() {
		return this._ipAddress;
	}

	get userAgent() {
		return this._userAgent;
	}

	get expiresAt() {
		return this._expiresAt;
	}

	get lastUsedAt() {
		return this._lastUsedAt;
	}

	get isRevoked() {
		return this._isRevoked;
	}

	get isExpired() {
		return this._expiresAt >= new Date();
	}

	get isValid() {
		return this.isRevoked === false && this.isExpired === false;
	}

	static get lifetime() {
		return process.env.SESSION_LIFETIME_IN_MS;
	}
	//#endregion Getters

	//#region Setters
	set lastUsedAt(lastUsedAt: Session.Type['lastUsedAt']) {
		this._lastUsedAt = lastUsedAt;
		this._updatedAt = new Date();
	}
	//#endregion Setters

	//#region Methods
	revoke() {
		this._isRevoked = true;
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
			refreshToken: this.refreshToken,
			csrfToken: this.csrfToken,
			ipAddress: this.ipAddress,
			userAgent: this.userAgent,
			expiresAt: this.expiresAt,
			lastUsedAt: this.lastUsedAt,
			isRevoked: this.isRevoked,
		};
	}

	fromJSON(data: Session.Type): Session {
		const session = new Session({
			userId: data.userId,
			ipAddress: data.ipAddress,
			userAgent: data.userAgent,
		});

		session._id = data.id;
		session._createdAt = data.createdAt;
		session._updatedAt = data.updatedAt;
		session._refreshToken = data.refreshToken;
		session._csrfToken = data.csrfToken;
		session._expiresAt = data.expiresAt;
		session._lastUsedAt = data.lastUsedAt;
		session._isRevoked = data.isRevoked;

		return session;
	}
	//#endregion JSON Parse
}
export namespace Session {
	export type ConstructorParams = Pick<Type, 'userId' | 'ipAddress' | 'userAgent'>;

	export type Type = DbEntity.Type & {
		userId: string;
		refreshToken: string;
		csrfToken: string;
		ipAddress: string;
		userAgent: string;
		expiresAt: Date;
		lastUsedAt: Date;
		isRevoked: boolean;
	};

	export type UniqueFields = 'id' | 'refreshToken' | 'csrfToken';

	export type SearchableFields = {
		id: string;
		userId: string;
		refreshToken: string;
		expiresAt: [Date, Date];
		lastUsedAt: [Date, Date];
		isRevoked: boolean;
	};

	export type UpdatableFields = 'lastUsedAt' | 'isRevoked' | 'updatedAt';
}
