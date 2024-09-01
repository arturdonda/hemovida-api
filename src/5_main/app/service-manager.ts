import express, { Express } from 'express';

export class ServiceManager {
	readonly express: Express;

	constructor() {
		this.express = express();
	}

	public async connectAllServices(): Promise<void> {}

	public async disconnectAllServices(): Promise<void> {}
}
