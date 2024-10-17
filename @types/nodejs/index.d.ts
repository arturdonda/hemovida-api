declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production';

		ENV: 'LOCAL' | 'DEV' | 'STAGE' | 'PROD';

		PORT: number;
		HOST: string;

		SESSION_LIFETIME_IN_MS: number;
		UI_HOST: string;
	}
}
