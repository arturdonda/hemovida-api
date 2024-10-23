import { IpLookupServiceProtocol, UserAgentLookupServiceProtocol } from '@application/protocols/infra';
import { Session } from '@domain/entities';

export async function createSessionMetadata(params: CreateSessionMetadataParams) {
	const ipData = await params.ipLookupService.lookup(params.ipAddress);

	const userAgentData = params.userAgentLookupService.lookup(params.userAgent);

	const metadata: Session.Metadata = {
		userAgent: userAgentData.userAgent,
		browser: userAgentData.browserName,
		device: { type: userAgentData.deviceType, os: { name: userAgentData.deviceOsName, version: userAgentData.deviceOsVersion } },
		geolocation: {
			lat: ipData.latitude,
			lon: ipData.longitude,
			city: ipData.city,
			region: { code: ipData.regionCode, name: ipData.regionName },
			country: { code: ipData.countryCode, name: ipData.countryName },
		},
	};

	return metadata;
}

type CreateSessionMetadataParams = Pick<Session, 'ipAddress'> &
	Pick<Session.Metadata, 'userAgent'> & {
		ipLookupService: IpLookupServiceProtocol;
		userAgentLookupService: UserAgentLookupServiceProtocol;
	};
