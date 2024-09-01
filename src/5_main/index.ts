import { Application, ServiceManager } from '@main/app';

export function startApplication() {
	const serviceManager = new ServiceManager();

	const application = new Application({ port: process.env.PORT, serviceManager });

	application.start();
}
