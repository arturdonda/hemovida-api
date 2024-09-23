import { NotFoundUsecaseProtocol } from '@application/protocols/use-cases/system';
import { Controller, HttpRequest, HttpResponse } from '@presentation/app';

export class NotFoundController extends Controller<NotFoundUsecaseProtocol.Params, NotFoundUsecaseProtocol.Result> {
	parseRequest(httpRequest: HttpRequest): NotFoundUsecaseProtocol.Params {
		return;
	}

	parseResponse(result: NotFoundUsecaseProtocol.Result): HttpResponse<any> {
		return HttpResponse.NotFound({ message: "Uh-oh, we couldn't fetch that! Looks like this page is playing hide and seek.", result: null });
	}
}
