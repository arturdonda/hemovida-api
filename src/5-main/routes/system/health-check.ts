import { IRoute } from '@main/protocols';
import { healthCheckControllerFactory } from '@main/factories/system';

export const healthCheckRoute: IRoute = {
	method: 'get',
	path: '/',
	preRouterMiddlewares: [],
	postRouterMiddlewares: [],
	controllerFactory: healthCheckControllerFactory,
};
