import { HealthCheckUsecaseProtocol } from '@application/protocols/use-cases/system';
import { HealthCheckUsecase } from '@application/use-cases/system';
import { HealthCheckController } from '@presentation/controllers/system';
import { ControllerFactoryProtocol } from '@main/protocols';

export const healthCheckControllerFactory: HealthCheckControllerFactoryProtocol = serviceManager => {
	return function (tracer) {
		const healthCheckUsecase = new HealthCheckUsecase(tracer);

		const healthCheckController = new HealthCheckController(healthCheckUsecase, tracer);

		return healthCheckController;
	};
};

type HealthCheckControllerFactoryProtocol = ControllerFactoryProtocol<HealthCheckUsecaseProtocol.Params, HealthCheckUsecaseProtocol.Result>;
