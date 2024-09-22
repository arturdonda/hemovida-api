import { Tracer } from '@domain/app';
import { Controller, HttpResponse } from '4-presentation/app';
import { Request, Response, NextFunction } from 'express';

export type IPreRouterMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export type IPostRouterMiddleware = <T extends HttpResponse.ResultType>(httpResponse: HttpResponse<T>, req: Request, res: Response, next: NextFunction) => void;

export type IHandleRequestMiddleware = <Params, Result>(controllerFactory: (tracer: Tracer) => Controller<Params, Result>) => IPreRouterMiddleware;
