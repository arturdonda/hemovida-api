import { Component } from '@domain/app';
import { Schemas } from './schemas';

export abstract class DatabaseProtocol extends Component {
	constructor(protected readonly constructorParams: DatabaseProtocol.ConstructorParams) {
		super();
	}

	abstract connect(params: DatabaseProtocol.Connect.Params): DatabaseProtocol.Connect.Result;

	abstract disconnect(params: DatabaseProtocol.Disconnect.Params): DatabaseProtocol.Disconnect.Result;

	abstract get repositories(): DatabaseProtocol.Repositories;
}

export namespace DatabaseProtocol {
	export type ConnectionParams = { host: string; port: number; username: string; password: string };

	export type ConstructorParams = { read?: ConnectionParams; write: ConnectionParams };

	export namespace Connect {
		export type Params = void;
		export type Result = Promise<void>;
	}

	export namespace Disconnect {
		export type Params = void;
		export type Result = Promise<void>;
	}

	export import Repositories = Schemas;
}
