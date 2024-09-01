import { GLOBAL_MIDDLEWARES } from './global';
import { SPECIFIC_MIDDLEWARES } from './specific';
import { handleRequest } from './handle-request';

export const MIDDLWARES = {
	GLOBAL: GLOBAL_MIDDLEWARES,
	SPECIFIC: SPECIFIC_MIDDLEWARES,
	handleRequest,
};
