import { IHealthCheckUsecase } from '@application/protocols/use-cases/system';
import { Controller, HttpRequest, HttpResponse } from '@presentation/app';

export class HealthCheckController extends Controller<IHealthCheckUsecase.Params, IHealthCheckUsecase.Result> {
	parseRequest(httpRequest: HttpRequest): IHealthCheckUsecase.Params {
		return;
	}

	parseResponse(result: IHealthCheckUsecase.Result): HttpResponse<any> {
		return HttpResponse.Ok({ message: 'All systems are a go! The API is as happy as a dog with a new chew toy!', result });
	}
}
