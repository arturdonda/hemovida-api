import { IpLookupServiceProtocol } from '@application/protocols/infra';
import Ipdata from 'ipdata';

export class IpdataIpLookupService extends IpLookupServiceProtocol {
	private client: Ipdata;

	constructor() {
		super();

		this.client = new Ipdata(process.env.IPDATA_API_KEY);
	}

	lookup(ipAddress: IpLookupServiceProtocol.Lookup.Params): IpLookupServiceProtocol.Lookup.Result {
		return this.client.lookup(ipAddress).then(result => ({
			ip: result.ip,
			latitude: result.latitude,
			longitude: result.longitude,
			countryCode: result.country_code,
			countryName: result.country_name,
			regionCode: result.region_code ?? '',
			regionName: result.region ?? '',
			city: result.city ?? '',
			postalCode: result.postal ?? '',
			callingCode: result.calling_code,
			flagImage: result.flag,
			flageEmoji: result.emoji_flag,
		}));
	}
}
