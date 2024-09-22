import { Tracer } from '@domain/app';
import { IPreRouterMiddleware } from '@main/protocols';

export const injectTracer: IPreRouterMiddleware = function (req, res, next) {
	req.tracer = new Tracer();

	next();
};
