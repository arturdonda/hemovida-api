import { IPostRouterMiddleware } from '@main/protocols';

export const logHttpResponse: IPostRouterMiddleware = function (httpResponse, req, res, next) {
	req.tracer.logger.log('Router', `Replying ${httpResponse.statusCode} at ${new Date().toISOString()}`);

	next(httpResponse);
};
