import { Component } from '@domain/app';

export class ServiceManager extends Component {
	constructor() {
		super();
	}

	public async connectAllServices(): Promise<void> {
		this.logger.log('Connecting all services...');

		await Promise.resolve();

		this.logger.log('All services are connected!');
	}

	public async disconnectAllServices(): Promise<void> {
		this.logger.log('Disconnecting all services...');

		await Promise.resolve();

		this.logger.log('All services are disconnected!');
	}
}
