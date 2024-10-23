import { Usecase } from '@domain/app';
import { Session } from '@domain/entities';

export abstract class RefreshAccessUsecaseProtocol extends Usecase<RefreshAccessUsecaseProtocol.Params, RefreshAccessUsecaseProtocol.Result> {}

export namespace RefreshAccessUsecaseProtocol {
	export type Params = Pick<Session, 'refreshToken' | 'ipAddress'> & Pick<Session.Metadata, 'userAgent'>;
	export type Result = { accessToken: string };
}
