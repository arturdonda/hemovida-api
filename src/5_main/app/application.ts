import { Component } from '@domain/app';
import { ServiceManager } from '@main/app';
import { configureRouter } from '@main/config';
import { Server as HttpServer } from 'http';

export class Application extends Component {
	private readonly serviceManager: Application.ConstructorParams['serviceManager'];
	private readonly port: Application.ConstructorParams['port'];
	private httpServer: HttpServer | undefined;
	private isConfigured: boolean;

	constructor(constructorParams: Application.ConstructorParams) {
		super();

		this.serviceManager = constructorParams.serviceManager;
		this.port = constructorParams.port;
		this.httpServer = undefined;
		this.isConfigured = false;

		['SIGINT', 'SIGTERM'].forEach(signal =>
			process.on(signal, () => {
				this.logger.log(`Signal '${signal}' received. Shutting down...`);
				this.stop();
			})
		);
	}

	async configure(): Promise<void> {
		// Configure logger
		// Logger.configure();

		// Connect services
		await this.serviceManager.connectAllServices();

		// // Configure pre-router middlewares
		// configurePreRouterGlobalMiddlewares(this.serviceManager.express);

		// // Configure router
		configureRouter(this.serviceManager);

		// // Configure post-router middlewares
		// configurePostRouterGlobalMiddlewares(this.serviceManager.express);

		this.isConfigured = true;
	}

	async start(): Promise<void> {
		if (!!this.httpServer) throw new Error('Server is already running!');

		if (!this.isConfigured) await this.configure();

		this.httpServer = this.serviceManager.express.listen(this.port, () => this.logger.log(`Running on port ${this.port}`));
	}

	async stop(): Promise<void> {
		if (!this.httpServer) throw new Error('Server is not running!');

		await this.serviceManager.disconnectAllServices();

		return new Promise((resolve, reject) => {
			this.httpServer!.close(() => resolve(this.logger.log(`Shutdown successfully`)));
		});
	}
}

export namespace Application {
	export type ConstructorParams = { port: number; serviceManager: ServiceManager };
}
