import { IGlobalPreRouterMiddleware } from '@main/protocols';
import cors from 'cors';

export const configureCors: IGlobalPreRouterMiddleware = function (app) {
	app.use(cors({ origin: '*', methods: '*' }));
	app.options('*', cors());
};
