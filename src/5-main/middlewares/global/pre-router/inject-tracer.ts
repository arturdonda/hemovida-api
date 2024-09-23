import { Tracer } from '@domain/app';
import { PreRouterMiddlewareProtocol } from '@main/protocols';

export const injectTracer: PreRouterMiddlewareProtocol = function (req, res, next) {
	req.tracer = new Tracer();

	next();
};
