import { IGlobalPreRouterMiddleware } from '@main/protocols';
import { urlencoded } from 'express';

export const configureUrlEncodedBody: IGlobalPreRouterMiddleware = function (app) {
	app.use(urlencoded({ extended: true }));
};
