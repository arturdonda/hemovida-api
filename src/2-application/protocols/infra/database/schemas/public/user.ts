import { User } from '@domain/entities';
import { RepositoryProtocol } from '../repository';
import { PaginatedResult } from '@application/helpers';

export abstract class UserRepositoryProtocol extends RepositoryProtocol<User, User.UniqueFields, User.SearchableFields, User.UpdatableFields> {}

export class UserRepository extends UserRepositoryProtocol {
	private readonly users: User[];

	constructor() {
		super();

		this.users = [];
	}

	async getAll(params: RepositoryProtocol.GetAll.Params<User, User.SearchableFields>): RepositoryProtocol.GetAll.Result<User> {
		const users = await Promise.resolve(this.users.filter(u => u.name.toLowerCase().startsWith(params.name?.toLowerCase() ?? '')));

		const page = new PaginatedResult({ pageParams: params.pageParams, totalCount: users.length, data: users.slice(0, params.pageParams.pageSize) });

		return page;
	}

	getOne(params: Partial<Pick<User, User.UniqueFields>>): RepositoryProtocol.GetOne.Result<User> {
		throw new Error('Method not implemented.');
	}

	create(params: User): RepositoryProtocol.Create.Result<User> {
		throw new Error('Method not implemented.');
	}

	update(params: RepositoryProtocol.Update.Params<User, User.UpdatableFields>): RepositoryProtocol.Update.Result<User> {
		throw new Error('Method not implemented.');
	}

	delete(params: Partial<Pick<User, User.UniqueFields>>): RepositoryProtocol.Delete.Result {
		throw new Error('Method not implemented.');
	}
}
