import { Component } from '@domain/app';

export abstract class HashServiceProtocol extends Component {
	abstract hash(params: HashServiceProtocol.Hash.Params): HashServiceProtocol.Hash.Result;
	abstract verify(params: HashServiceProtocol.Verify.Params): HashServiceProtocol.Verify.Result;
}

export namespace HashServiceProtocol {
	export namespace Hash {
		export type Params = string;
		export type Result = string;
	}

	export namespace Verify {
		export type Params = { text: string; hash: string };
		export type Result = boolean;
	}
}
