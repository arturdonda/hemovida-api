import { IControllerFactory, IPostRouterMiddleware, IPreRouterMiddleware } from '.';

export type IRoute = {
	method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
	path: string;
	preRouterMiddlewares: IPreRouterMiddleware[];
	postRouterMiddlewares: IPostRouterMiddleware[];
	controllerFactory: IControllerFactory<any, any>;
};
