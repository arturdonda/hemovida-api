import { USER_MODEL } from './user';
import { Sequelize, ModelStatic, Model } from 'sequelize';

export function configureSchemaPublic(sequelize: Sequelize): PublicSchema {
	const SCHEMA_NAME = 'public';

	const User = sequelize.define(`${SCHEMA_NAME}_user`, USER_MODEL, {
		schema: SCHEMA_NAME,
		tableName: 'users',
	});

	return { User };
}

export type PublicSchema = {
	User: ModelStatic<Model>;
};
