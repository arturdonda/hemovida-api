import { IPreRouterMiddleware } from '@main/protocols';
import { json } from 'express';

export const configureJsonBody: IPreRouterMiddleware = function (req, res, next) {
	json();

	next();
};
