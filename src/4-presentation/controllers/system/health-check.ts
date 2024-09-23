import { HealthCheckUsecaseProtocol } from '@application/protocols/use-cases/system';
import { Controller, HttpRequest, HttpResponse } from '@presentation/app';

export class HealthCheckController extends Controller<HealthCheckUsecaseProtocol.Params, HealthCheckUsecaseProtocol.Result> {
	parseRequest(httpRequest: HttpRequest): HealthCheckUsecaseProtocol.Params {
		return;
	}

	parseResponse(result: HealthCheckUsecaseProtocol.Result): HttpResponse<any> {
		return HttpResponse.Ok({ message: 'All systems are a go! The API is as happy as a dog with a new chew toy!', result });
	}
}
