import { SESSION_MODEL } from './session';
import { USER_MODEL } from './user';
import { Sequelize, ModelStatic, Model } from 'sequelize';

export function configureSchemaPublic(sequelize: Sequelize): PublicSchema {
	const SCHEMA_NAME = 'public';

	const Session = sequelize.define(`${SCHEMA_NAME}_sessions`, SESSION_MODEL, {
		schema: SCHEMA_NAME,
		tableName: 'sessions',
	});

	const User = sequelize.define(`${SCHEMA_NAME}_user`, USER_MODEL, {
		schema: SCHEMA_NAME,
		tableName: 'users',
	});

	return { Session, User };
}

export type PublicSchema = {
	Session: ModelStatic<Model>;
	User: ModelStatic<Model>;
};
