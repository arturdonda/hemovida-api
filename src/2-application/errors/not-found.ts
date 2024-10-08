import { CustomError } from '@domain/app';

export class NotFoundError extends CustomError {
	constructor(entityName: string) {
		super({ code: 400, message: `${entityName[0].toUpperCase() + entityName.slice(1)} not found` });
	}
}
