import { HealthCheckUsecaseProtocol } from '@application/protocols/use-cases/system';
import { version } from '@root/package.json';

export class HealthCheckUsecase extends HealthCheckUsecaseProtocol {
	protected validateParams(params: HealthCheckUsecaseProtocol.Params): void {
		return;
	}

	protected main(params: HealthCheckUsecaseProtocol.Params): Promise<HealthCheckUsecaseProtocol.Result> {
		return Promise.resolve({ env: process.env.ENV, version });
	}
}
