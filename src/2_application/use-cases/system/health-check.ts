import { IHealthCheckUsecase } from '@application/protocols/use-cases/system';
import { version } from '@root/package.json';

export class HealthCheckUsecase extends IHealthCheckUsecase {
	protected validateParams(params: IHealthCheckUsecase.Params): void {
		return;
	}

	protected main(params: IHealthCheckUsecase.Params): Promise<IHealthCheckUsecase.Result> {
		return Promise.resolve({ env: process.env.ENV, version });
	}
}
