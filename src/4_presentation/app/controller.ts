import { CustomError, TraceableComponent, Tracer, Usecase } from '@domain/app';
import { HttpRequest, HttpResponse } from '.';

export abstract class Controller<Params, Result> extends TraceableComponent<HttpRequest, HttpResponse<any>> {
	abstract parseRequest(httpRequest: HttpRequest): Params;
	abstract parseResponse(result: Result): HttpResponse<any>;

	constructor(private readonly usecase: Usecase<Params, Result>, tracer: Tracer) {
		super(tracer);
	}

	protected async main(httpRequest: HttpRequest): Promise<HttpResponse<any>> {
		try {
			const params = this.parseRequest(httpRequest);

			const result = await this.usecase.exec(params);

			const httpResponse = this.parseResponse(result);

			return httpResponse;
		} catch (error: any) {
			return this.parseErrorResponse(error);
		}
	}

	protected parseErrorResponse(error: Error): HttpResponse<{ name: string; message: string }> {
		const httpResponseParams: HttpResponse.FactoryParams<{ name: string; message: string }> = {
			message: 'friendly error message',
			result: { name: error.name, message: error.message },
		};

		if (CustomError.isCustomError(error)) return HttpResponse.BadRequest(httpResponseParams);

		return HttpResponse.InternalServerError(httpResponseParams);
	}
}
