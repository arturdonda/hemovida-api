import { Component } from '@domain/app';

export abstract class TokenServiceProtocol extends Component {
	abstract encode<T>(params: TokenServiceProtocol.Encode.Params<T>): TokenServiceProtocol.Encode.Result;
	abstract decode<T>(params: TokenServiceProtocol.Decode.Params): TokenServiceProtocol.Decode.Result<T>;
}

export namespace TokenServiceProtocol {
	export namespace Encode {
		export type Params<T> = { payload: T; expiresInMs: number };
		export type Result = string;
	}

	export namespace Decode {
		export type Params = string;
		export type Result<T> = T;
	}
}
