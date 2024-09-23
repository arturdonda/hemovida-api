import { NotFoundUsecaseProtocol } from '@application/protocols/use-cases/system';
import { NotFoundUsecase } from '@application/use-cases/system';
import { NotFoundController } from '@presentation/controllers/system';
import { ControllerFactoryProtocol } from '@main/protocols';

export const notFoundControllerFactory: NotFoundControllerFactoryProtocol = serviceManager => {
	return function (tracer) {
		const notFoundUsecase = new NotFoundUsecase(tracer);

		const notFoundController = new NotFoundController(notFoundUsecase, tracer);

		return notFoundController;
	};
};

type NotFoundControllerFactoryProtocol = ControllerFactoryProtocol<NotFoundUsecaseProtocol.Params, NotFoundUsecaseProtocol.Result>;
