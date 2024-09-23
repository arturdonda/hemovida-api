import { PreRouterMiddlewareProtocol } from '@main/protocols';

export const logHttpRequest: PreRouterMiddlewareProtocol = function (req, res, next) {
	req.tracer.logger.log('Router', `Received ${req.method.toUpperCase()} on ${req.path} at ${new Date().toISOString()}`);

	next();
};
