import { Component } from '@domain/app';
import { MIDDLWARES } from '@main/middlewares';
import { ROUTES } from '@main/routes';
import { ServiceManager } from '@main/app';

import express, { Express, Router } from 'express';
import { Server as HttpServer } from 'http';

export class Server extends Component {
	readonly express: Express;
	private httpServer: HttpServer | undefined;

	constructor() {
		super();

		this.express = express();
		this.httpServer = undefined;
	}

	get isRunning() {
		return !!this.httpServer;
	}

	configure(serviceManager: ServiceManager): void {
		const router = Router();

		// Configure global pre-router middlewares
		for (const preRouterMiddleware of MIDDLWARES.GLOBAL.PRE_ROUTER) {
			this.express.use(preRouterMiddleware);
		}

		// Configure routes
		for (const route of ROUTES) {
			const controllerFactory = route.controllerFactory(serviceManager);
			const middlewares = [...route.preRouterMiddlewares, MIDDLWARES.handleRequest(controllerFactory), ...route.postRouterMiddlewares];

			router[route.method](route.path, middlewares);
		}

		this.express.use(router);

		// Configure global post-router middlewares
		for (const postRouterMiddleware of MIDDLWARES.GLOBAL.POST_ROUTER) {
			this.express.use(postRouterMiddleware);
		}
	}

	async start(port: number): Promise<void> {
		if (this.isRunning) throw new Error('Server is already running!');

		return new Promise((resolve, reject) => {
			this.httpServer = this.express.listen(port, () => {
				this.logger.log(`Running on port ${port}`);

				resolve();
			});
		});
	}

	async stop(): Promise<void> {
		if (!this.isRunning) throw new Error('Server is not running!');

		return new Promise((resolve, reject) => {
			this.httpServer!.close(() => {
				this.httpServer = undefined;

				this.logger.log(`Shutdown successfully`);

				resolve();
			});
		});
	}
}
