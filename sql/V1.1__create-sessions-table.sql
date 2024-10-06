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

CREATE INDEX IF NOT EXISTS sessions_index_id			ON sessions(id);
CREATE INDEX IF NOT EXISTS sessions_index_user_id		ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_index_refresh_token	ON sessions(refresh_token);
CREATE INDEX IF NOT EXISTS sessions_index_expires_at	ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS sessions_index_last_used_at	ON sessions(last_used_at);
CREATE INDEX IF NOT EXISTS sessions_index_is_revoked	ON sessions(is_revoked);