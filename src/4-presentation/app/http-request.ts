import { Entity } from '@domain/app';

export class HttpRequest extends Entity<HttpRequest.Type> {
	public readonly ip: HttpRequest.Type['ip'];
	public readonly params: HttpRequest.Type['params'];
	public readonly query: HttpRequest.Type['query'];
	public readonly headers: HttpRequest.Type['headers'];
	public readonly cookies: HttpRequest.Type['cookies'];
	public readonly body: HttpRequest.Type['body'];

	constructor(params: HttpRequest.ConstructorParams) {
		super();
		this.ip = params.ip;
		this.params = params.params;
		this.query = params.query;
		this.headers = params.headers;
		this.cookies = params.cookies;
		this.body = params.body;
	}

	toJSON(): HttpRequest.Type {
		return {
			ip: this.ip,
			params: this.params,
			query: this.query,
			headers: this.headers,
			cookies: this.cookies,
			body: this.body,
		};
	}
}

export namespace HttpRequest {
	export type Type = {
		ip: string;
		params: Record<string, string>;
		query: Record<string, string>;
		headers: Record<string, string>;
		cookies: Record<string, string>;
		body: Record<string, unknown>;
	};

	export type ConstructorParams = Type;
}
