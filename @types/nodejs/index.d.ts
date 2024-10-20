declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production';

		ENV: 'LOCAL' | 'DEV' | 'STAGE' | 'PROD';

		PORT: number;
		HOST: string;
		UI_HOST: string;

		SESSION_LIFETIME_IN_MS: number;
		ACCESS_TOKEN_LIFETIME_IN_MS: number;
	}
}
