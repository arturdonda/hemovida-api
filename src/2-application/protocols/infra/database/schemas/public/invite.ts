import { Invite } from '@domain/entities';
import { RepositoryProtocol } from '../repository';

export abstract class InviteRepositoryProtocol extends RepositoryProtocol<Invite, Invite.UniqueFields, Invite.SearchableFields, Invite.UpdatableFields> {
	abstract getAll(params: InviteRepositoryProtocol.GetAll.Params): InviteRepositoryProtocol.GetAll.Result;
	abstract getOne(params: InviteRepositoryProtocol.GetOne.Params): InviteRepositoryProtocol.GetOne.Result;
	abstract create(params: InviteRepositoryProtocol.Create.Params): InviteRepositoryProtocol.Create.Result;
	abstract update(params: InviteRepositoryProtocol.Update.Params): InviteRepositoryProtocol.Update.Result;
	abstract delete(params: InviteRepositoryProtocol.Delete.Params): InviteRepositoryProtocol.Delete.Result;
}

export namespace InviteRepositoryProtocol {
	export namespace GetAll {
		export type Params = RepositoryProtocol.GetAll.Params<Invite, Invite.SearchableFields>;
		export type Result = RepositoryProtocol.GetAll.Result<Invite>;
	}

	export namespace GetOne {
		export type Params = RepositoryProtocol.GetOne.Params<Invite, Invite.UniqueFields>;
		export type Result = RepositoryProtocol.GetOne.Result<Invite>;
	}

	export namespace Create {
		export type Params = Invite;
		export type Result = RepositoryProtocol.Create.Result<Invite>;
	}

	export namespace Update {
		export type Params = RepositoryProtocol.Update.Params<Invite>;
		export type Result = RepositoryProtocol.Update.Result<Invite>;
	}

	export namespace Delete {
		export type Params = RepositoryProtocol.Delete.Params<Invite>;
		export type Result = RepositoryProtocol.Delete.Result;
	}
}
