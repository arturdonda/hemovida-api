export abstract class EmailServiceProtocol {
	abstract send(params: EmailServiceProtocol.Send.Params): EmailServiceProtocol.Send.Result;
}

export namespace EmailServiceProtocol {
	export namespace Send {
		export type Params = {
			to: string | string[];
			cc?: string | string[];
			bcc?: string | string[];
			subject: string;
			body: string;
		};

		export type Result = Promise<void>;
	}
}
