// export type ConstructorType<T = {}> = new (...args: any[]) => T;

// export function applyMixins(...constructors: ConstructorType[]) {
// 	class BaseClass {}

// 	for (const ctor of constructors) {
// 		// Copy instance methods
// 		for (const instanceMethod of Object.getOwnPropertyNames(ctor.prototype)) {
// 			if (instanceMethod === 'constructor') continue;

// 			Object.defineProperty(BaseClass.prototype, instanceMethod, Object.getOwnPropertyDescriptor(ctor.prototype, instanceMethod) || Object.create(null));
// 		}

// 		// Copy static methods and properties
// 		for (const staticMethod of Object.getOwnPropertyNames(ctor)) {
// 			if (['prototype', 'name', 'length'].includes(staticMethod)) continue;

// 			Object.defineProperty(BaseClass, staticMethod, Object.getOwnPropertyDescriptor(ctor, staticMethod) || Object.create(null));
// 		}
// 	}

// 	return BaseClass;
// }

// class A {
// 	methodA() {
// 		console.log('Method A from class A');
// 	}
// }

// class B {
// 	methodB() {
// 		console.log('Method B from class B');
// 	}

// 	static staticB() {
// 		console.log('Static method B from class B');
// 	}
// }

// class C {
// 	constructor(protected readonly requiredCProperty: string) {}

// 	methodC() {
// 		console.log('Method C from class C', this.requiredCProperty);
// 	}

// 	protected protectedCtest() {
// 		console.log('Protected C test!');
// 	}
// }

// interface D extends A, B, C {}

// class D extends applyMixins(A, B, C) {
// 	constructor() {
// 		super();
// 	}

// 	methodD() {
// 		console.log('Method D from class D');
// 		this.protectedCtest();
// 	}
// }

// let test = new D();

// test.methodA(); // Prints "Method A from class A"
// test.methodB(); // Prints "Method B from class B"
// test.methodC(); // Prints "Method C from class C"
// test.methodD(); // Prints "Method D from class D"

// console.log('------------------------------');

// console.log(D);

// ------------------------------------------------------------------

class A {
	methodA() {
		console.log('Method A from class A');
	}
}

class B {
	methodB() {
		console.log('Method B from class B');
	}

	static staticB() {
		console.log('Static method B from class B');
	}
}

class C {
	constructor(protected readonly requiredCProperty: string) {}

	methodC() {
		console.log('Method C from class C', this.requiredCProperty);
	}

	protected protectedCtest() {
		console.log('Protected C test!');
	}
}

class ABC {
	constructor(protected readonly a: A, protected readonly b: B, protected readonly c: C) {}
}

class D extends ABC {
	constructor(requiredCProperty: C['requiredCProperty']) {
		super(new A(), new B(), new C(requiredCProperty));
	}

	methodD() {
		console.log('Method D from class D');
		this.c;
	}
}
