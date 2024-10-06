import { v4, v7 } from 'uuid';

export class Uuid {
	static v4() {
		return v4();
	}

	static v7() {
		return v7();
	}
}
