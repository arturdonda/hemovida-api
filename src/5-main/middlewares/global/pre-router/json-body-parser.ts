import { PreRouterMiddlewareProtocol } from '@main/protocols';
import { json } from 'express';

export const configureJsonBody: PreRouterMiddlewareProtocol = function (req, res, next) {
	json();

	next();
};
