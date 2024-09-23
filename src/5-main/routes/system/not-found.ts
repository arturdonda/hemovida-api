import { RouteProtocol } from '@main/protocols';
import { notFoundControllerFactory } from '@main/factories/system';

export const notFoundRoute: RouteProtocol = {
	method: 'get',
	path: '*',
	preRouterMiddlewares: [],
	postRouterMiddlewares: [],
	controllerFactory: notFoundControllerFactory,
};
