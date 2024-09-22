export abstract class Entity<T extends Record<string, unknown>> {
	abstract toJSON(): T;

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toJSON();
	}
}
