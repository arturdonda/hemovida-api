import { PreRouterMiddlewareProtocol } from '@main/protocols';
import { urlencoded } from 'express';

export const configureUrlEncodedBody: PreRouterMiddlewareProtocol = urlencoded({ extended: true });
