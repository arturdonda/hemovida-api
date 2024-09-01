import { IPreRouterMiddleware } from '@main/protocols';

export const logHttpRequest: IPreRouterMiddleware = function (req, res, next) {
	req.tracer.logger.log('Router', `Received ${req.method.toUpperCase()} on ${req.path} at ${new Date().toISOString()}`);

	next();
};
