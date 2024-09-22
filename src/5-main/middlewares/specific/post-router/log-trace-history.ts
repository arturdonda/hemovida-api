import { IPostRouterMiddleware } from '@main/protocols';

export const logTraceHistory: IPostRouterMiddleware = function (httpResponse, req, res, next) {
	req.tracer.logger.log('----- Trace History -----');
	console.table(req.tracer.toJSON().traceHistory);

	return next(httpResponse);
};
