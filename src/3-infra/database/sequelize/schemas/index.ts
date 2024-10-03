import { configureSchemaPublic, PublicSchema } from './public';
import { Sequelize } from 'sequelize';

export function configureSchemas(sequelize: Sequelize): Schemas {
	const Public = configureSchemaPublic(sequelize);

	return { Public };
}

export type Schemas = {
	Public: PublicSchema;
};
