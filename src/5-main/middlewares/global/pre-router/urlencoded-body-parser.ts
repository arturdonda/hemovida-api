import { PreRouterMiddlewareProtocol } from '@main/protocols';
import { urlencoded } from 'express';

export const configureUrlEncodedBody: PreRouterMiddlewareProtocol = function (req, res, next) {
	urlencoded({ extended: true });

	next();
};
