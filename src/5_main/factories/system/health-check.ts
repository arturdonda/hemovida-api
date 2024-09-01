import { IHealthCheckUsecase } from '@application/protocols/use-cases/system';
import { HealthCheckUsecase } from '@application/use-cases/system';
import { HealthCheckController } from '@presentation/controllers/system';
import { IControllerFactory } from '@main/protocols';

export const healthCheckControllerFactory: IHealthCheckControllerFactory = serviceManager => {
	return function (tracer) {
		const healthCheckUsecase = new HealthCheckUsecase(tracer);

		const healthCheckController = new HealthCheckController(healthCheckUsecase, tracer);

		return healthCheckController;
	};
};

type IHealthCheckControllerFactory = IControllerFactory<IHealthCheckUsecase.Params, IHealthCheckUsecase.Result>;
