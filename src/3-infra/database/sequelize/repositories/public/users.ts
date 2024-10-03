import { User } from '@domain/entities';
import { UserRepositoryProtocol } from '@application/protocols/infra/database/schemas/public/user';
import { RepositoryProtocol } from '@application/protocols/infra/database/schemas/repository';
import { PageParams, PaginatedResult } from '@application/helpers';
import { UserDto } from '../../dtos/public';

import { Model, ModelStatic, Op, Order, WhereOptions } from 'sequelize';

export class UserRepository extends UserRepositoryProtocol {
	constructor(private readonly users: ModelStatic<Model>) {
		super();
	}

	getAll({ pageParams, searchableFields }: RepositoryProtocol.GetAll.Params<User, User.SearchableFields>): RepositoryProtocol.GetAll.Result<User> {
		return this.users
			.findAndCountAll({
				col: `${this.users.name}.id`,
				where: this.makeWhereClause(searchableFields),
				order: this.makeOrderClause(pageParams),
				offset: this.makeOffsetClause(pageParams),
				limit: this.makeLimitClause(pageParams),
			})
			.then(result => new PaginatedResult({ pageParams, totalCount: result.count, data: result.rows.map(UserDto.map) }));
	}

	getOne({ uniqueFields }: RepositoryProtocol.GetOne.Params<User, User.UniqueFields>): RepositoryProtocol.GetOne.Result<User> {
		return this.users.findOne({ where: this.makeWhereClause(uniqueFields) }).then(result => (result ? UserDto.map(result) : null));
	}

	create(user: User): RepositoryProtocol.Create.Result<User> {
		return this.users
			.create({
				id: user.id,
				created_at: user.createdAt,
				updated_at: user.updatedAt,
				first_name: user.firstName,
				surname: user.surname,
				preferred_name: user.preferredName,
				email: user.email,
				phone: user.phone,
				cpf: user.cpf,
				birthday: user.birthday,
				status: user.status,
				password: user.password,
			})
			.then(UserDto.map);
	}

	update(user: RepositoryProtocol.Update.Params<User>): RepositoryProtocol.Update.Result<User> {
		return this.users
			.update(
				{
					updated_at: user.updatedAt,
					first_name: user.firstName,
					surname: user.surname,
					preferred_name: user.preferredName,
					phone: user.phone,
					birthday: user.birthday,
					status: user.status,
					password: user.password,
				},
				{ where: this.makeWhereClause({ id: user.id }), returning: true }
			)
			.then(([count, rows]) => UserDto.map(rows[0]));
	}

	delete(user: RepositoryProtocol.Delete.Params<User>): RepositoryProtocol.Delete.Result {
		return this.users.update({ status: User.Status.Inactive }, { where: this.makeWhereClause({ id: user.id }), returning: false }).then(() => {});
	}

	//#region Clauses
	private makeWhereClause(filters: Partial<Pick<User, User.UniqueFields> & User.SearchableFields>): WhereOptions {
		const whereOptions: WhereOptions = [];

		// Unique Fields
		if (filters.id) whereOptions.push({ id: filters.id });
		if (filters.cpf) whereOptions.push({ cpf: filters.cpf });
		if (filters.email) whereOptions.push({ email: filters.email });
		if (filters.phone) whereOptions.push({ phone: filters.email });

		// Searchable Fields
		if (filters.birthday !== undefined) whereOptions.push({ birthday: { [Op.between]: filters.birthday } });
		if (filters.name !== undefined)
			whereOptions.push({
				[Op.or]: [
					{ first_name: { [Op.iLike]: `%${filters.name}%` } },
					{ surname: { [Op.iLike]: `%${filters.name}%` } },
					{ preferred_name: { [Op.iLike]: `%${filters.name}%` } },
				],
			});
		if (filters.status !== undefined) whereOptions.push({ status: filters.status.toString() });

		return whereOptions;
	}

	private makeOrderClause(pageParams: PageParams<User>): Order {
		return [pageParams.sortBy, pageParams.sortDirection];
	}

	private makeOffsetClause(pageParams: PageParams<User>): number {
		return (pageParams.pageNumber - 1) * pageParams.pageSize;
	}

	private makeLimitClause(pageParams: PageParams<User>) {
		return pageParams.pageSize;
	}
	//#endregion Clauses
}
