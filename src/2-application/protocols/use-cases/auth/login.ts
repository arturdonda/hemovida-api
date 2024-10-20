import { Usecase } from '@domain/app';
import { Session, User } from '@domain/entities';

export abstract class LoginUsecaseProtocol extends Usecase<LoginUsecaseProtocol.Params, LoginUsecaseProtocol.Result> {}

export namespace LoginUsecaseProtocol {
	export type Params = Pick<User, 'email' | 'password'> & Pick<Session, 'ipAddress'> & { userAgent: string };
	export type Result = Pick<Session, 'refreshToken'> & { user: User; accessToken: string };
}
