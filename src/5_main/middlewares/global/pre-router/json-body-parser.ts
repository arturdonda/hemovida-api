import { IGlobalPreRouterMiddleware } from '@main/protocols';
import { json } from 'express';

export const configureJsonBody: IGlobalPreRouterMiddleware = function (app) {
	app.use(json());
};
