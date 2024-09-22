import { DbEntity } from '@domain/entities';
import { InvalidParamError } from '@domain/errors';
import { isCpfValid, isEmailValid } from '@domain/helpers';

export class User extends DbEntity<User.Type> {
	private _firstName: User.Type['firstName'];
	private _surname: User.Type['surname'];
	private _preferredName: User.Type['preferredName'];
	private _cpf: User.Type['cpf'];
	private _phone: User.Type['phone'];
	private _email: User.Type['email'];
	private _password: User.Type['password'];
	private _birthday: User.Type['birthday'];
	private _status: User.Type['status'];

	constructor(params: User.ConstructorParams) {
		super();

		this._firstName = params.firstName;
		this._surname = params.surname;
		this._preferredName = params.preferredName;
		this._cpf = this.validateCpf(params.cpf);
		this._phone = this.validatePhone(params.phone);
		this._email = this.validateEmail(params.email);
		this._password = params.password;
		this._birthday = params.birthday;
		this._status = User.Status.Pending;
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

	get preferredName() {
		return this._preferredName;
	}

	get name() {
		return this._preferredName ?? `${this._firstName} ${this._surname}`;
	}

	get cpf() {
		return this._cpf;
	}

	get phone() {
		return this._phone;
	}

	get email() {
		return this._email;
	}

	get password() {
		return this._password;
	}

	get birthday() {
		return this._birthday;
	}

	get status() {
		return this._status;
	}
	//#endregion Getters

	//#region Setters
	set firstName(firstName: User.Type['firstName']) {
		this._firstName = firstName;
		this._updatedAt = new Date();
	}

	set surname(surname: User.Type['surname']) {
		this._surname = surname;
		this._updatedAt = new Date();
	}

	set preferredName(preferredName: User.Type['preferredName']) {
		this._preferredName = preferredName;
		this._updatedAt = new Date();
	}

	set cpf(cpf: User.Type['cpf']) {
		this._cpf = this.validateCpf(cpf);
		this._updatedAt = new Date();
	}

	set phone(phone: User.Type['phone']) {
		this._phone = this.validatePhone(phone);
		this._updatedAt = new Date();
	}

	set email(email: User.Type['email']) {
		this._email = this.validateEmail(email);
		this._updatedAt = new Date();
	}

	set password(password: User.Type['password']) {
		this._password = password;
		this._updatedAt = new Date();
	}

	set birthday(birthday: User.Type['birthday']) {
		this._birthday = birthday;
		this._updatedAt = new Date();
	}

	set status(status: User.Type['status']) {
		this._status = status;
		this._updatedAt = new Date();
	}
	//#endregion Setters

	//#region Validation
	private validateCpf(cpf: User.Type['cpf']): User.Type['cpf'] {
		cpf = cpf.replace(/\D/g, '');

		if (isCpfValid(cpf)) return cpf;

		throw new InvalidParamError('cpf');
	}

	private validatePhone(phone: User.Type['phone']): User.Type['phone'] {
		phone = phone.replace(/\D/g, '');

		if (phone.length !== 11) throw new InvalidParamError('phone', 'deve ter 11 caracteres');

		return phone;
	}

	private validateEmail(email: User.Type['email']): User.Type['email'] {
		email = email.trim().toLowerCase();

		if (isEmailValid(email)) return email;

		throw new InvalidParamError('email');
	}
	//#endregion Validation

	//#region JSON Parse
	toJSON(): User.Type {
		return {
			id: this._id,
			firstName: this._firstName,
			surname: this._surname,
			preferredName: this._preferredName,
			cpf: this._cpf,
			phone: this._phone,
			email: this._email,
			password: this._password,
			birthday: this._birthday,
			status: this._status,
			createdAt: this._createdAt,
			updatedAt: this._updatedAt,
		};
	}

	static override fromJSON(data: User.Type): User {
		const user = new User({
			firstName: data.firstName,
			surname: data.surname,
			preferredName: data.preferredName,
			cpf: data.cpf,
			phone: data.phone,
			email: data.email,
			password: data.password,
			birthday: data.birthday,
		});

		user._id = data.id;
		user._createdAt = data.createdAt;
		user._updatedAt = data.updatedAt;
		user._status = data.status;

		return user;
	}
	//#endregion JSON Parse
}

export namespace User {
	export type ConstructorParams = Omit<Type, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

	export type Type = DbEntity.Type & {
		firstName: string;
		surname: string;
		preferredName: string | null;
		cpf: string;
		phone: string;
		email: string;
		password: string;
		birthday: Date;
		status: Status;
	};

	export enum Status {
		Active = 'active',
		Pending = 'pending',
		Inactive = 'inactive',
	}
}