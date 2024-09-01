import { Tracer } from '@domain/app';
import { Controller, HttpResponse } from '@presentation/app';
import { Request, Response, NextFunction, Express } from 'express';

// Route-specific middlewares
export type IPreRouterMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export type IPostRouterMiddleware = <T extends HttpResponse.ResultType>(httpResponse: HttpResponse<T>, req: Request, res: Response, next: NextFunction) => void;

// Global middlewares
export type IGlobalPreRouterMiddleware = (app: Express) => void;

export type IGlobalPostRouterMiddleware = (app: Express) => void;

// Handle Request middleware
export type IHandleRequestMiddleware = <Params, Result>(controllerFactory: (tracer: Tracer) => Controller<Params, Result>) => IPreRouterMiddleware;
