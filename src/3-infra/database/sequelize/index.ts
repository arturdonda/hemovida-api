import { DatabaseProtocol } from '@application/protocols/infra';
import { configureSchemas, Schemas } from '@infra/database/sequelize/schemas';
import { Repositories } from './repositories';
import { Sequelize, Options } from 'sequelize';

export class PostgresDatabase extends DatabaseProtocol {
	private instance: Sequelize | undefined;
	private schemas: Schemas | undefined;

	private readonly DEFAULT_CONNECTION_OPTIONS: Options = {
		dialect: 'postgres',
		define: {
			freezeTableName: true,
			schema: 'public',
			timestamps: false,
		},
		logging: false,
	};

	constructor(protected readonly constructorParams: DatabaseProtocol.ConstructorParams) {
		super(constructorParams);
	}

	public connect(): Promise<void> {
		this.instance = new Sequelize({
			...this.DEFAULT_CONNECTION_OPTIONS,
			replication: {
				read: this.constructorParams.read
					? [
							{
								host: this.constructorParams.read.host,
								port: this.constructorParams.read.port,
								username: this.constructorParams.read.username,
								password: this.constructorParams.read.password,
							},
					  ]
					: [],
				write: {
					host: this.constructorParams.write.host,
					port: this.constructorParams.write.port,
					username: this.constructorParams.write.username,
					password: this.constructorParams.write.password,
				},
			},
		});

		this.schemas = configureSchemas(this.instance);

		return this.instance
			.authenticate()
			.then(() => this.logger.log('Connection established'))
			.catch(error => {
				this.logger.error('Error stablishing connection:', error);

				throw error;
			});
	}

	async disconnect(): Promise<void> {
		if (!this.instance) return Promise.resolve();

		return this.instance
			.close()
			.then(() => this.logger.log('Connection terminated'))
			.catch(error => {
				this.logger.error('Error disconnecting:', error);

				throw error;
			});
	}

	get repositories(): DatabaseProtocol.Repositories {
		if (!this.schemas) throw new Error('Database not connected!');

		return {
			Public: {
				User: new Repositories.Public.User(this.schemas.Public.User),
			},
		};
	}
}
