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
	,invited_by		VARCHAR(32) 	NOT NULL	REFERENCES users(id)
	,expires_at		TIMESTAMP		NOT NULL
);

CREATE INDEX IF NOT EXISTS invites_index_first_name	ON invites(first_name);
CREATE INDEX IF NOT EXISTS invites_index_surname	ON invites(surname);
CREATE INDEX IF NOT EXISTS invites_index_email		ON invites(email);
CREATE INDEX IF NOT EXISTS invites_index_status		ON invites(status);
CREATE INDEX IF NOT EXISTS invites_index_invited_by	ON invites(invited_by);
