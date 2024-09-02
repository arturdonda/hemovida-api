import { Component } from '@domain/app';
import { ServiceManager } from '@main/app';
import { Server } from './server';

export class Application extends Component {
	private readonly server: Server;
	private readonly serviceManager: ServiceManager;
	private readonly port: Application.ConstructorParams['port'];

	constructor(constructorParams: Application.ConstructorParams) {
		super();

		this.server = new Server();
		this.serviceManager = new ServiceManager();
		this.port = constructorParams.port;

		this.configureGracefulShutdown();
	}

	private configureGracefulShutdown() {
		for (const signal of ['SIGINT', 'SIGTERM']) {
			process.on(signal, () => {
				this.logger.log(`Signal '${signal}' received. Shutting down...`);
				this.stop();
			});
		}
	}

	private async configure(): Promise<void> {
		await this.serviceManager.connectAllServices();

		this.server.configure(this.serviceManager);
	}

	async start(): Promise<void> {
		await this.configure();

		await this.server.start(this.port);

		this.logger.log(`Application is running on ${process.env.HOST}:${this.port}`);
	}

	async stop(): Promise<void> {
		await this.serviceManager.disconnectAllServices();

		await this.server.stop();

		this.logger.log(`Application closed!`);
	}
}

export namespace Application {
	export type ConstructorParams = { port: number };
}
