import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class LogoutUsecaseProtocol extends Usecase<LogoutUsecaseProtocol.Params, LogoutUsecaseProtocol.Result> {}

export namespace LogoutUsecaseProtocol {
	export type Params = Pick<Session, 'refreshToken'>;
	export type Result = void;
}
