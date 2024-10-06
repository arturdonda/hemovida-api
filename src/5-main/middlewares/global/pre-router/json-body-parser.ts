import { PreRouterMiddlewareProtocol } from '@main/protocols';
import { json } from 'express';

export const configureJsonBody: PreRouterMiddlewareProtocol = json();
