import { Tracer } from '@domain/app';
import { Session } from '@domain/entities';
import { DatabaseProtocol, IpLookupServiceProtocol, UserAgentLookupServiceProtocol } from '@application/protocols/infra';
import { CreateSessionUsecaseProtocol } from '@application/protocols/use-cases/session';

export class CreateSessionUsecase extends CreateSessionUsecaseProtocol {
	constructor(
		tracer: Tracer,
		private readonly sessionRepository: DatabaseProtocol.Repositories.Public.Session,
		private readonly ipLookupServiceProtocol: IpLookupServiceProtocol,
		private readonly userAgentLookupServiceProtocol: UserAgentLookupServiceProtocol
	) {
		super(tracer);
	}

	protected validateParams(params: CreateSessionUsecaseProtocol.Params): void {
		return;
	}

	protected async main({ ipAddress, userAgent, user }: CreateSessionUsecaseProtocol.Params): Promise<CreateSessionUsecaseProtocol.Result> {
		const ipData = await this.ipLookupServiceProtocol.lookup(ipAddress);

		const userAgentData = this.userAgentLookupServiceProtocol.lookup(userAgent);

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

		const session = new Session({ ipAddress: ipData.ip, userId: user.id, metadata });

		return this.sessionRepository.create(session);
	}
}
