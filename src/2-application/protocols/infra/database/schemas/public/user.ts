import { User } from '@domain/entities';
import { RepositoryProtocol } from '../repository';

export abstract class UserRepositoryProtocol extends RepositoryProtocol<User, User.UniqueFields, User.SearchableFields, User.UpdatableFields> {}
