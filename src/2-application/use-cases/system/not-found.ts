import { INotFoundUsecase } from '@application/protocols/use-cases/system';

export class NotFoundUsecase extends INotFoundUsecase {
	protected validateParams(params: INotFoundUsecase.Params): void {
		return;
	}

	protected main(params: INotFoundUsecase.Params): Promise<void> {
		return Promise.resolve();
	}
}
