import { CustomError } from '@domain/app';

export class AlreadyRegisteredError extends CustomError {
	constructor(entityName: string, field: string) {
		super({ code: 400, message: `${entityName} already registered for this ${field}.` });
	}
}
