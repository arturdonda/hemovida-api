import { ServiceManager } from '@main/app';
import { MIDDLWARES } from '@main/middlewares';
import { ROUTES } from '@main/routes';
import { Router } from 'express';

export function configureRouter(serviceManager: ServiceManager) {
	// Configure global pre-router middlewares
	for (const preRouterMiddleware of MIDDLWARES.GLOBAL.PRE_ROUTER) {
		preRouterMiddleware(serviceManager.express);
	}

	// Configure routes
	configureRoutes(serviceManager);

	// Configure global post-router middlewares
	for (const postRouterMiddleware of MIDDLWARES.GLOBAL.POST_ROUTER) {
		postRouterMiddleware(serviceManager.express);
	}
}

function configureRoutes(serviceManager: ServiceManager) {
	const router = Router();

	// Configure routes
	for (const route of ROUTES) {
		const controllerFactory = route.controllerFactory(serviceManager);
		const middlewares = [...route.preRouterMiddlewares, MIDDLWARES.handleRequest(controllerFactory), ...route.postRouterMiddlewares];

		router[route.method](route.path, middlewares);
	}

	serviceManager.express.use(router);
}
