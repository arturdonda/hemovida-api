import { IPreRouterMiddleware } from '@main/protocols';
import { configureCors } from './cors';
import { injectTracer } from './inject-tracer';
import { configureJsonBody } from './json-body-parser';
import { configureUrlEncodedBody } from './urlencoded-body-parser';

export const GLOBAL_PRE_ROUTER_MIDDLEWARES: IPreRouterMiddleware[] = [configureJsonBody, configureUrlEncodedBody, configureCors, injectTracer];
