import { Component } from '@domain/app';

export abstract class UserAgentLookupServiceProtocol extends Component {
	abstract lookup(params: UserAgentLookupServiceProtocol.Lookup.Params): UserAgentLookupServiceProtocol.Lookup.Result;
}

export namespace UserAgentLookupServiceProtocol {
	export namespace Lookup {
		export type Params = string;
		export type Result = UserAgentData;
	}

	type UserAgentData = {
		userAgent: string;
		browserName: string;
		browserVersion: string;
		deviceType: string;
		deviceVendor: string;
		deviceModel: string;
		deviceOsName: string;
		deviceOsVersion: string;
	};
}
