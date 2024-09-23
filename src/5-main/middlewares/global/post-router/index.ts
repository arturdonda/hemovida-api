import { PostRouterMiddlewareProtocol } from '@main/protocols';
import { sendResponse } from './send-response';

export const GLOBAL_POST_ROUTER_MIDDLEWARES: PostRouterMiddlewareProtocol[] = [sendResponse];
