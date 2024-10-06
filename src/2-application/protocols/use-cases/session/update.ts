import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class UpdateSessionUsecaseProtocol extends Usecase<UpdateSessionUsecaseProtocol.Params, UpdateSessionUsecaseProtocol.Result> {}

export namespace UpdateSessionUsecaseProtocol {
	export type Params = Partial<Pick<Session, Session.UpdatableFields>>;
	export type Result = Session;
}
