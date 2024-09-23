import { HealthCheckUsecaseProtocol } from '@application/protocols/use-cases/system';
import { HealthCheckUsecase } from '@application/use-cases/system';
import { HealthCheckController } from '4-presentation/controllers/system';
import { IControllerFactory } from '@main/protocols';

export const healthCheckControllerFactory: HealthCheckControllerFactoryProtocol = serviceManager => {
	return function (tracer) {
		const healthCheckUsecase = new HealthCheckUsecase(tracer);

		const healthCheckController = new HealthCheckController(healthCheckUsecase, tracer);

		return healthCheckController;
	};
};

type HealthCheckControllerFactoryProtocol = IControllerFactory<HealthCheckUsecaseProtocol.Params, HealthCheckUsecaseProtocol.Result>;
