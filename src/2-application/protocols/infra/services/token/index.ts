import { Component } from '@domain/app';

export abstract class TokenServiceProtocol extends Component {
	abstract encode<T extends Record<string, unknown>>(params: TokenServiceProtocol.Encode.Params<T>): TokenServiceProtocol.Encode.Result;
	abstract decode<T extends Record<string, unknown>>(params: TokenServiceProtocol.Decode.Params): TokenServiceProtocol.Decode.Result<T>;
}

export namespace TokenServiceProtocol {
	export namespace Encode {
		export type Params<T extends Record<string, unknown>> = { payload: T; expiresInMs: number };
		export type Result = string;
	}

	export namespace Decode {
		export type Params = string;
		export type Result<T extends Record<string, unknown>> = T;
	}
}
