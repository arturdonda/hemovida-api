import { randomUUID } from 'crypto';

export class Uuid {
	static generate() {
		return randomUUID();
	}
}
