import { PreRouterMiddlewareProtocol } from '@main/protocols';
import { configureCors } from './cors';
import { configureHelmet } from './helmet';
import { injectTracer } from './inject-tracer';
import { configureJsonBody } from './json-body-parser';
import { configureUrlEncodedBody } from './urlencoded-body-parser';

export const GLOBAL_PRE_ROUTER_MIDDLEWARES: PreRouterMiddlewareProtocol[] = [
	configureCors,
	configureHelmet,
	injectTracer,
	configureJsonBody,
	configureUrlEncodedBody,
];
