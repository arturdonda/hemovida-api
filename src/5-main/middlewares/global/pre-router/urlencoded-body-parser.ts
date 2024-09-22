import { IPreRouterMiddleware } from '@main/protocols';
import { urlencoded } from 'express';

export const configureUrlEncodedBody: IPreRouterMiddleware = function (req, res, next) {
	urlencoded({ extended: true });

	next();
};
