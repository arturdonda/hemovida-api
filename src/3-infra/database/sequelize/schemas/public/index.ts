import { INVITE_MODEL } from './invite';
import { SESSION_MODEL } from './session';
import { USER_MODEL } from './user';
import { Sequelize, ModelStatic, Model } from 'sequelize';

export function configureSchemaPublic(sequelize: Sequelize): PublicSchema {
	const SCHEMA_NAME = 'public';

	const Invite = sequelize.define(`${SCHEMA_NAME}_invites`, INVITE_MODEL, {
		schema: SCHEMA_NAME,
		tableName: 'invites',
	});

	const Session = sequelize.define(`${SCHEMA_NAME}_sessions`, SESSION_MODEL, {
		schema: SCHEMA_NAME,
		tableName: 'sessions',
	});

	const User = sequelize.define(`${SCHEMA_NAME}_user`, USER_MODEL, {
		schema: SCHEMA_NAME,
		tableName: 'users',
	});

	return { Invite, Session, User };
}

export type PublicSchema = {
	Invite: ModelStatic<Model>;
	Session: ModelStatic<Model>;
	User: ModelStatic<Model>;
};
