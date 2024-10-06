import { PreRouterMiddlewareProtocol } from '@main/protocols';
import helmet from 'helmet';

export const configureHelmet: PreRouterMiddlewareProtocol = helmet();
