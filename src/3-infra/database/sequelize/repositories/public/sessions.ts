import { Session } from '@domain/entities';
import { SessionRepositoryProtocol } from '@application/protocols/infra/database/schemas/public/session';
import { PageParams, PaginatedResult } from '@application/helpers';
import { NotFoundError } from '@application/errors';
import { SessionDto } from '../../dtos/public';

import { Model, ModelStatic, Op, Order, WhereOptions } from 'sequelize';

export class SessionRepository extends SessionRepositoryProtocol {
	constructor(private readonly sessions: ModelStatic<Model>) {
		super();
	}

	getAll({ pageParams, ...searchableFields }: SessionRepositoryProtocol.GetAll.Params): SessionRepositoryProtocol.GetAll.Result {
		return this.sessions
			.findAndCountAll({
				col: `${this.sessions.name}.id`,
				where: this.makeWhereClause(searchableFields),
				order: this.makeOrderClause(pageParams),
				offset: this.makeOffsetClause(pageParams),
				limit: this.makeLimitClause(pageParams),
			})
			.then(result => new PaginatedResult({ pageParams, totalCount: result.count, data: result.rows.map(SessionDto.map) }));
	}

	getOne(uniqueFields: SessionRepositoryProtocol.GetOne.Params): SessionRepositoryProtocol.GetOne.Result {
		return this.sessions.findOne({ where: this.makeWhereClause(uniqueFields, 'OR') }).then(result => (result ? SessionDto.map(result) : null));
	}

	create(session: Session): SessionRepositoryProtocol.Create.Result {
		return this.sessions
			.create({
				id: session.id,
				created_at: session.createdAt,
				updated_at: session.updatedAt,
				user_id: session.userId,
				refresh_token: session.refreshToken,
				csrf_token: session.csrfToken,
				ip_address: session.ipAddress,
				user_agent: session.userAgent,
				expires_at: session.expiresAt,
				last_used_at: session.lastUsedAt,
				is_revoked: session.isRevoked,
			})
			.then(SessionDto.map);
	}

	update(session: SessionRepositoryProtocol.Update.Params): SessionRepositoryProtocol.Update.Result {
		return this.sessions
			.update(
				{
					updated_at: session.updatedAt,
					last_used_at: session.lastUsedAt,
					is_revoked: session.isRevoked,
				},
				{ where: this.makeWhereClause({ id: session.id }), returning: true }
			)
			.then(([count, rows]) => {
				if (count === 0) throw new NotFoundError(Session);

				return SessionDto.map(rows[0]);
			});
	}

	delete(session: SessionRepositoryProtocol.Delete.Params): SessionRepositoryProtocol.Delete.Result {
		return this.sessions.update({ is_revoked: true }, { where: this.makeWhereClause({ id: session.id }), returning: false }).then(() => {});
	}

	//#region Clauses
	private makeWhereClause(filters: Partial<Session.SearchableFields>, operator: 'AND' | 'OR' = 'AND'): WhereOptions {
		const whereOptions: WhereOptions[] = [];

		if (filters.id) whereOptions.push({ id: filters.id });
		if (filters.userId) whereOptions.push({ user_id: filters.userId });
		if (filters.refreshToken) whereOptions.push({ refresh_token: filters.refreshToken });
		if (filters.expiresAt !== undefined) whereOptions.push({ expires_at: { [Op.between]: filters.expiresAt } });
		if (filters.lastUsedAt !== undefined) whereOptions.push({ last_used_at: { [Op.between]: filters.lastUsedAt } });
		if (filters.isRevoked !== undefined) whereOptions.push({ is_revoked: filters.isRevoked });

		return { [operator === 'AND' ? Op.and : Op.or]: whereOptions };
	}

	private makeOrderClause(pageParams: PageParams<Session>): Order {
		return [pageParams.sortBy, pageParams.sortDirection];
	}

	private makeOffsetClause(pageParams: PageParams<Session>): number {
		return (pageParams.pageNumber - 1) * pageParams.pageSize;
	}

	private makeLimitClause(pageParams: PageParams<Session>) {
		return pageParams.pageSize;
	}
	//#endregion Clauses
}
