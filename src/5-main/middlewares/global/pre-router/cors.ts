import { PreRouterMiddlewareProtocol } from '@main/protocols';
import cors from 'cors';

export const configureCors: PreRouterMiddlewareProtocol = function (req, res, next) {
	cors({ origin: '*', methods: '*' });

	next();
};
