import { UserAgentLookupServiceProtocol } from '@application/protocols/infra';
import uaparser from 'ua-parser-js';

export class UaparserUserAgentLookupService extends UserAgentLookupServiceProtocol {
	lookup(userAgent: UserAgentLookupServiceProtocol.Lookup.Params): UserAgentLookupServiceProtocol.Lookup.Result {
		const parser = new uaparser(userAgent);

		const browser = parser.getBrowser();
		const device = parser.getDevice();
		const os = parser.getOS();

		return {
			userAgent,
			browserName: browser.name ?? '',
			browserVersion: browser.version ?? '',
			deviceType: device.type ?? '',
			deviceVendor: device.vendor ?? '',
			deviceModel: device.model ?? '',
			deviceOsName: os.name ?? '',
			deviceOsVersion: os.version ?? '',
		};
	}
}
