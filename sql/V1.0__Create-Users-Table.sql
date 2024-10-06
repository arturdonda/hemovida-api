DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'pending', 'inactive');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS users (
	 id				UUID			NOT	NULL	PRIMARY	KEY
	,created_at		TIMESTAMP		NOT	NULL
	,updated_at		TIMESTAMP		NOT	NULL

	,first_name		VARCHAR(50)		NOT	NULL
	,surname		VARCHAR(50)		NOT	NULL
	,preferred_name	VARCHAR(100)
	,email			VARCHAR(50)		NOT	NULL	UNIQUE
	,phone			VARCHAR(11)		NOT	NULL	UNIQUE
	,cpf			VARCHAR(11)		NOT	NULL	UNIQUE
	,birthday		DATE			NOT	NULL
	,status			user_status		NOT	NULL	DEFAULT	'pending'
	,password		VARCHAR			NOT	NULL
);

CREATE INDEX IF NOT EXISTS users_index_first_name		ON users(first_name);
CREATE INDEX IF NOT EXISTS users_index_surname			ON users(surname);
CREATE INDEX IF NOT EXISTS users_index_preferred_name	ON users(preferred_name);
CREATE INDEX IF NOT EXISTS users_index_email			ON users(email);
CREATE INDEX IF NOT EXISTS users_index_cpf				ON users(cpf);
CREATE INDEX IF NOT EXISTS users_index_birthday			ON users(birthday);
CREATE INDEX IF NOT EXISTS users_index_status			ON users(status);