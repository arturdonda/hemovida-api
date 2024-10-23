declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production';

		ENV: 'LOCAL' | 'DEV' | 'STAGE' | 'PROD';

		PORT: number;
		HOST: string;
		UI_HOST: string;

		SESSION_LIFETIME_IN_MS: number;
		ACCESS_TOKEN_LIFETIME_IN_MS: number;

		EMAIL_SERVICE_AUTH_USER: string;
		EMAIL_SERVICE_AUTH_PASS: string;

		IPDATA_API_KEY: string;

		TOKEN_SERVICE_AUDIENCE: string;
		TOKEN_SERVICE_ISSUER: string;
		TOKEN_SERVICE_SECRET: string;
	}
}
