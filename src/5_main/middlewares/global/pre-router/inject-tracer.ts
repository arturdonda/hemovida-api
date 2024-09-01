import { Tracer } from '@domain/app';
import { IGlobalPreRouterMiddleware } from '@main/protocols';

export const injectTracer: IGlobalPreRouterMiddleware = function (app) {
	app.use((req, res, next) => {
		req.tracer = new Tracer();

		next();
	});
};
