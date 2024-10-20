import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class UpdateSessionUsecaseProtocol extends Usecase<UpdateSessionUsecaseProtocol.Params, UpdateSessionUsecaseProtocol.Result> {}

export namespace UpdateSessionUsecaseProtocol {
	export type Params = Pick<Session, 'id' | 'ipAddress'> & { userAgent: string };
	export type Result = Session;
}
