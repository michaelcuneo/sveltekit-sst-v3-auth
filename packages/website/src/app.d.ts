// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
			errorId?: string;
		}
		interface Locals {
			user: User | undefined;
			session: Session | undefined;
			startTimer: number;
			error: string | undefined;
			errorId: string | undefined;
			errorStackTrace: string | undefined;
			message: unknown;
			track: unknown;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
