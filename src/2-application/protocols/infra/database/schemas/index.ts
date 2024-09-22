import { PublicSchema } from './public';

export interface Schemas {
	Public: PublicSchema;
}

export namespace Schemas {
	export import Public = PublicSchema;
}
