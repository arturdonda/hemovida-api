import { RouteProtocol } from '@main/protocols';
import { healthCheckRoute } from './health-check';
import { notFoundRoute } from './not-found';

export const SYSTEM_ROUTES: RouteProtocol[] = [healthCheckRoute, notFoundRoute];
