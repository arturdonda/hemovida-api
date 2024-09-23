import { Tracer } from '@domain/app';
import { Controller, HttpResponse } from '@presentation/app';
import { Request, Response, NextFunction } from 'express';

export type PreRouterMiddlewareProtocol = (req: Request, res: Response, next: NextFunction) => void;

export type PostRouterMiddlewareProtocol = <T extends HttpResponse.ResultType>(
	httpResponse: HttpResponse<T>,
	req: Request,
	res: Response,
	next: NextFunction
) => void;

export type HandleRequestMiddlewareProtocol = <Params, Result>(
	controllerFactory: (tracer: Tracer) => Controller<Params, Result>
) => PreRouterMiddlewareProtocol;
