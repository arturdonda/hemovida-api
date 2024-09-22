export abstract class CustomError extends Error {
	readonly code: number;

	constructor({ message, code, originalError }: CustomError.ConstructorParams) {
		super(message, { cause: originalError });

		this.code = code;
		this.name = this.constructor.name;
	}

	static isCustomError(error: Error) {
		return error instanceof CustomError;
	}
}

export namespace CustomError {
	export type ConstructorParams = { message: string; code: number; originalError?: Error };
}
