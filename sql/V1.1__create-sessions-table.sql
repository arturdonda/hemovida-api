CREATE TABLE IF NOT EXISTS sessions (
	 id				UUID		NOT	NULL	PRIMARY	KEY
	,created_at		TIMESTAMP	NOT	NULL
	,updated_at		TIMESTAMP	NOT	NULL

	,user_id		UUID		NOT NULL	REFERENCES users(id)
	,refresh_token	UUID		NOT NULL	UNIQUE
	,csrf_token		UUID		NOT NULL	UNIQUE
	,ip_address		INET		NOT NULL
	,user_agent		TEXT		NOT NULL
	,expires_at		TIMESTAMP	NOT NULL
	,last_used_at	TIMESTAMP	NOT NULL
	,is_revoked		BOOLEAN		NOT NULL	DEFAULT false
);
