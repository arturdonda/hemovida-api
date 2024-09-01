import { IRoute } from '@main/protocols';
import { notFoundControllerFactory } from '@main/factories/system';

export const notFoundRoute: IRoute = {
	method: 'get',
	path: '*',
	preRouterMiddlewares: [],
	postRouterMiddlewares: [],
	controllerFactory: notFoundControllerFactory,
};
