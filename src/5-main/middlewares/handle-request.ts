import { HttpRequest } from '4-presentation/app';
import { IHandleRequestMiddleware } from '@main/protocols';

export const handleRequest: IHandleRequestMiddleware = function (controllerFactory) {
	return async function handleRequest(req, res, next) {
		const controller = controllerFactory(req.tracer);

		const httpRequest = new HttpRequest({
			ip: req.ip ?? '',
			params: req.params,
			query: req.query as Record<string, string>,
			headers: req.headers as Record<string, string>,
			cookies: req.cookies,
			body: req.body,
		});

		const httpResponse = await controller.exec(httpRequest);

		next(httpResponse);
	};
};
