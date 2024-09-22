import { IPreRouterMiddleware } from '@main/protocols';
import cors from 'cors';

export const configureCors: IPreRouterMiddleware = function (req, res, next) {
	cors({ origin: '*', methods: '*' });

	next();
};
