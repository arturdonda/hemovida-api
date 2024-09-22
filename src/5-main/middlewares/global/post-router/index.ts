import { IPostRouterMiddleware } from '@main/protocols';
import { sendResponse } from './send-response';

export const GLOBAL_POST_ROUTER_MIDDLEWARES: IPostRouterMiddleware[] = [sendResponse];
