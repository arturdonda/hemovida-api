import { INotFoundUsecase } from '@application/protocols/use-cases/system';
import { Controller, HttpRequest, HttpResponse } from '@presentation/app';

export class NotFoundController extends Controller<INotFoundUsecase.Params, INotFoundUsecase.Result> {
	parseRequest(httpRequest: HttpRequest): INotFoundUsecase.Params {
		return;
	}

	parseResponse(result: INotFoundUsecase.Result): HttpResponse<any> {
		return HttpResponse.NotFound({ message: "Uh-oh, we couldn't fetch that! Looks like this page is playing hide and seek.", result: null });
	}
}
