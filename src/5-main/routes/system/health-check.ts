import { RouteProtocol } from '@main/protocols';
import { healthCheckControllerFactory } from '@main/factories/system';

export const healthCheckRoute: RouteProtocol = {
	method: 'get',
	path: '/',
	preRouterMiddlewares: [],
	postRouterMiddlewares: [],
	controllerFactory: healthCheckControllerFactory,
};
