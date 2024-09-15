import { CustomError } from '@domain/app';

export class InvalidParamError extends CustomError {
	constructor(paramName: string, reason?: string) {
		super({ code: 400, message: reason ? `Invalid parameter "${paramName}": ${reason}.` : `Invalid parameter "${paramName}".` });
	}
}
