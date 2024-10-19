DO $$ BEGIN
    CREATE TYPE session_status AS ENUM ('active', 'expired', 'revoked');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS sessions (
	 id				UUID			NOT	NULL	PRIMARY	KEY
	,created_at		TIMESTAMP		NOT	NULL
	,updated_at		TIMESTAMP		NOT	NULL

	,user_id		UUID			NOT NULL	REFERENCES users(id)
	,status			session_status	NOT NULL	DEFAULT 'active'
	,refresh_token	UUID			NOT NULL	UNIQUE
	,csrf_token		UUID			NOT NULL	UNIQUE
	,ip_address		INET			NOT NULL
	,expires_at		TIMESTAMP		NOT NULL
	,metadata		JSONB			NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_index_id			ON sessions(id);
CREATE INDEX IF NOT EXISTS sessions_index_user_id		ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_index_status		ON sessions(status);
CREATE INDEX IF NOT EXISTS sessions_index_refresh_token	ON sessions(refresh_token);
CREATE INDEX IF NOT EXISTS sessions_index_expires_at	ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS sessions_index_metadata		ON sessions(metadata);
