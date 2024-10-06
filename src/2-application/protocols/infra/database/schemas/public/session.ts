import { Session } from '@domain/entities';
import { RepositoryProtocol } from '../repository';

export abstract class SessionRepositoryProtocol extends RepositoryProtocol<Session, Session.UniqueFields, Session.SearchableFields, Session.UpdatableFields> {
	abstract getAll(params: SessionRepositoryProtocol.GetAll.Params): SessionRepositoryProtocol.GetAll.Result;
	abstract getOne(params: SessionRepositoryProtocol.GetOne.Params): SessionRepositoryProtocol.GetOne.Result;
	abstract create(params: SessionRepositoryProtocol.Create.Params): SessionRepositoryProtocol.Create.Result;
	abstract update(params: SessionRepositoryProtocol.Update.Params): SessionRepositoryProtocol.Update.Result;
	abstract delete(params: SessionRepositoryProtocol.Delete.Params): SessionRepositoryProtocol.Delete.Result;
}

export namespace SessionRepositoryProtocol {
	export namespace GetAll {
		export type Params = RepositoryProtocol.GetAll.Params<Session, Session.SearchableFields>;
		export type Result = RepositoryProtocol.GetAll.Result<Session>;
	}

	export namespace GetOne {
		export type Params = RepositoryProtocol.GetOne.Params<Session, Session.UniqueFields>;
		export type Result = RepositoryProtocol.GetOne.Result<Session>;
	}

	export namespace Create {
		export type Params = Session;
		export type Result = RepositoryProtocol.Create.Result<Session>;
	}

	export namespace Update {
		export type Params = RepositoryProtocol.Update.Params<Session>;
		export type Result = RepositoryProtocol.Update.Result<Session>;
	}

	export namespace Delete {
		export type Params = RepositoryProtocol.Delete.Params<Session>;
		export type Result = RepositoryProtocol.Delete.Result;
	}
}
