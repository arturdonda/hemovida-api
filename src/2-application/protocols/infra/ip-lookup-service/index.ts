import { Component } from '@domain/app';

export abstract class IpLookupServiceProtocol extends Component {
	abstract lookup(params: IpLookupServiceProtocol.Lookup.Params): IpLookupServiceProtocol.Lookup.Result;
}

export namespace IpLookupServiceProtocol {
	export namespace Lookup {
		export type Params = string;
		export type Result = Promise<IpData>;
	}

	type IpData = {
		ip: string;
		latitude: number;
		longitude: number;
		countryCode: string;
		countryName: string;
		regionCode: string;
		regionName: string;
		city: string;
		postalCode: string;
		callingCode: string;
		flagImage: string;
		flageEmoji: string;
	};
}
