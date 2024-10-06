import { PreRouterMiddlewareProtocol } from '@main/protocols';
import cors from 'cors';

export const configureCors: PreRouterMiddlewareProtocol = cors();
