import { Logger } from '@domain/app';

export abstract class Component {
	protected logger: Logger;

	constructor() {
		this.logger = new Logger(this.constructor.name);
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
