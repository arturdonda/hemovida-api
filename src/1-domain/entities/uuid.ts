import uuid from 'uuid';

export class Uuid {
	static v4() {
		return uuid.v4();
	}

	static v7() {
		return uuid.v7();
	}
}
