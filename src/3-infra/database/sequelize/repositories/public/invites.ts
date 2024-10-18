import { Invite } from '@domain/entities';
import { InviteRepositoryProtocol } from '@application/protocols/infra/database/schemas/public/invite';
import { PageParams, PaginatedResult } from '@application/helpers';
import { NotFoundError } from '@application/errors';
import { InviteDto } from '../../dtos/public';

import { Model, ModelStatic, Op, Order, WhereOptions } from 'sequelize';

export class InviteRepository extends InviteRepositoryProtocol {
	constructor(private readonly invites: ModelStatic<Model>) {
		super();
	}

	getAll({ pageParams, ...searchableFields }: InviteRepositoryProtocol.GetAll.Params): InviteRepositoryProtocol.GetAll.Result {
		return this.invites
			.findAndCountAll({
				col: `${this.invites.name}.id`,
				where: this.makeWhereClause(searchableFields),
				order: this.makeOrderClause(pageParams),
				offset: this.makeOffsetClause(pageParams),
				limit: this.makeLimitClause(pageParams),
			})
			.then(result => new PaginatedResult({ pageParams, totalCount: result.count, data: result.rows.map(InviteDto.map) }));
	}

	getOne(uniqueFields: InviteRepositoryProtocol.GetOne.Params): InviteRepositoryProtocol.GetOne.Result {
		return this.invites.findOne({ where: this.makeWhereClause(uniqueFields, 'OR') }).then(result => (result ? InviteDto.map(result) : null));
	}

	create(invite: Invite): InviteRepositoryProtocol.Create.Result {
		return this.invites
			.create({
				id: invite.id,
				created_at: invite.createdAt,
				updated_at: invite.updatedAt,
				first_name: invite.firstName,
				surname: invite.surname,
				email: invite.email,
				status: invite.status,
				created_by: invite.createdBy,
				sent_at: invite.sentAt,
				sent_by: invite.sentBy,
				revoked_at: invite.revokedAt,
				revoked_by: invite.revokedBy,
				expires_at: invite.expiresAt,
			})
			.then(InviteDto.map);
	}

	update(invite: InviteRepositoryProtocol.Update.Params): InviteRepositoryProtocol.Update.Result {
		return this.invites
			.update(
				{
					status: invite.status,
					updated_at: invite.updatedAt,
				},
				{ where: this.makeWhereClause({ id: invite.id }), returning: true }
			)
			.then(([count, rows]) => {
				if (count === 0) throw new NotFoundError(Invite);

				return InviteDto.map(rows[0]);
			});
	}

	delete(invite: InviteRepositoryProtocol.Delete.Params): InviteRepositoryProtocol.Delete.Result {
		return this.invites.destroy({ where: this.makeWhereClause({ id: invite.id }) }).then(() => {});
	}

	//#region Clauses
	private makeWhereClause(filters: Partial<Invite.SearchableFields>, operator: 'AND' | 'OR' = 'AND'): WhereOptions {
		const whereOptions: WhereOptions[] = [];

		if (filters.id) whereOptions.push({ id: filters.id });
		if (filters.name !== undefined)
			whereOptions.push({
				[Op.or]: [{ first_name: { [Op.iLike]: `%${filters.name}%` } }, { surname: { [Op.iLike]: `%${filters.name}%` } }],
			});
		if (filters.email) whereOptions.push({ email: filters.email });
		if (filters.status) whereOptions.push({ status: filters.status });
		if (filters.createdBy) whereOptions.push({ created_by: filters.createdBy });
		if (filters.sentAt) whereOptions.push({ sent_at: { [Op.contained]: filters.sentAt } });
		if (filters.sentBy) whereOptions.push({ sent_by: filters.sentBy });
		if (filters.revokedAt) whereOptions.push({ revoked_at: { [Op.contained]: filters.revokedAt } });
		if (filters.revokedBy) whereOptions.push({ revoked_by: filters.revokedBy });
		if (filters.expiresAt) whereOptions.push({ expires_at: { [Op.contained]: filters.expiresAt } });

		return { [operator === 'AND' ? Op.and : Op.or]: whereOptions };
	}

	private makeOrderClause(pageParams: PageParams<Invite>): Order {
		return [pageParams.sortBy, pageParams.sortDirection];
	}

	private makeOffsetClause(pageParams: PageParams<Invite>): number {
		return (pageParams.pageNumber - 1) * pageParams.pageSize;
	}

	private makeLimitClause(pageParams: PageParams<Invite>) {
		return pageParams.pageSize;
	}
	//#endregion Clauses
}
