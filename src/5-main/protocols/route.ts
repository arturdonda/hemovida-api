import { ControllerFactoryProtocol, PostRouterMiddlewareProtocol, PreRouterMiddlewareProtocol } from '@main/protocols';

export type RouteProtocol = {
	method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
	path: string;
	preRouterMiddlewares: PreRouterMiddlewareProtocol[];
	postRouterMiddlewares: PostRouterMiddlewareProtocol[];
	controllerFactory: ControllerFactoryProtocol<any, any>;
};
