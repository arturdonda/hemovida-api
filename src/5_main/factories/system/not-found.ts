import { INotFoundUsecase } from '@application/protocols/use-cases/system';
import { NotFoundUsecase } from '@application/use-cases/system';
import { NotFoundController } from '@presentation/controllers/system';
import { IControllerFactory } from '@main/protocols';

export const notFoundControllerFactory: INotFoundControllerFactory = serviceManager => {
	return function (tracer) {
		const notFoundUsecase = new NotFoundUsecase(tracer);

		const notFoundController = new NotFoundController(notFoundUsecase, tracer);

		return notFoundController;
	};
};

type INotFoundControllerFactory = IControllerFactory<INotFoundUsecase.Params, INotFoundUsecase.Result>;
