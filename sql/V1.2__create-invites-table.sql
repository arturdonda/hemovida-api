DO $$ BEGIN
    CREATE TYPE invite_status AS ENUM ('created', 'sent', 'accepted', 'expired', 'revoked');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS invites (
	 id				UUID			NOT NULL	PRIMARY KEY
	,created_at		TIMESTAMP		NOT NULL
	,updated_at		TIMESTAMP		NOT NULL

	,first_name		VARCHAR(25) 	NOT NULL
	,surname		VARCHAR(25) 	NOT NULL
	,email			VARCHAR(50) 	NOT NULL	UNIQUE
	,status			invite_status	NOT NULL	DEFAULT 'created'
	,created_by		UUID			NOT NULL	REFERENCES users(id)
	,sent_at		TIMESTAMP
	,sent_by		UUID
	,revoked_at		TIMESTAMP
	,revoked_by		UUID
	,expires_at		TIMESTAMP
);

CREATE INDEX IF NOT EXISTS invites_index_first_name	ON invites(first_name);
CREATE INDEX IF NOT EXISTS invites_index_surname	ON invites(surname);
CREATE INDEX IF NOT EXISTS invites_index_email		ON invites(email);
CREATE INDEX IF NOT EXISTS invites_index_status		ON invites(status);
CREATE INDEX IF NOT EXISTS invites_index_created_by	ON invites(created_by);
CREATE INDEX IF NOT EXISTS invites_index_sent_at	ON invites(sent_at);
CREATE INDEX IF NOT EXISTS invites_index_sent_by	ON invites(sent_by);
CREATE INDEX IF NOT EXISTS invites_index_revoked_at	ON invites(revoked_at);
CREATE INDEX IF NOT EXISTS invites_index_revoked_by	ON invites(revoked_by);
CREATE INDEX IF NOT EXISTS invites_index_expires_at	ON invites(expires_at);
