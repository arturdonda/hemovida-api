import { PostRouterMiddlewareProtocol } from '@main/protocols';

export const sendResponse: PostRouterMiddlewareProtocol = function sendResponse(httpResponse, req, res, next) {
	if (httpResponse.headers) Object.entries(httpResponse.headers).forEach(entry => res.setHeader(entry[0], entry[1]));
	if (httpResponse.cookies) Object.entries(httpResponse.cookies).forEach(entry => res.cookie(entry[0], entry[1], { httpOnly: true }));

	res.status(httpResponse.statusCode).json(httpResponse.toJSON());
};
