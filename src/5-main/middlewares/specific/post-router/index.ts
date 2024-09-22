import { logHttpResponse } from './log-http-response';
import { logTraceHistory } from './log-trace-history';

export const SPECIFIC_POST_ROUTER_MIDDLEWARES = { logHttpResponse, logTraceHistory };
