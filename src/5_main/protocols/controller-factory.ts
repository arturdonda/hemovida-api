import { Tracer } from '@domain/app';
import { Controller } from '@presentation/app';
import { ServiceManager } from '@main/app';

export type IControllerFactory<Params, Result> = (params: ServiceManager) => (tracer: Tracer) => Controller<Params, Result>;
