import { PublicRepositories } from './public';

export interface Repositories {
	Public: PublicRepositories;
}

export namespace Repositories {
	export import Public = PublicRepositories;
}
