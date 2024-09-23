import { NotFoundUsecaseProtocol } from '@application/protocols/use-cases/system';

export class NotFoundUsecase extends NotFoundUsecaseProtocol {
	protected validateParams(params: NotFoundUsecaseProtocol.Params): void {
		return;
	}

	protected main(params: NotFoundUsecaseProtocol.Params): Promise<void> {
		return Promise.resolve();
	}
}
