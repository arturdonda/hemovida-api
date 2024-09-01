declare namespace Express {
	export interface Request {
		tracer: import('@domain/app').Tracer;
	}
}
