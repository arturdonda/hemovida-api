import { Application } from '@main/app';

export function startApplication() {
	const application = new Application({ port: process.env.PORT });

	return application.start();
}
