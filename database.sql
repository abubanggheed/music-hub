CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    email VARCHAR (100) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES person NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    head INT
)

CREATE TABLE song (
    id SERIAL PRIMARY KEY,
    creator INT REFERENCES person DEFAULT NULL,
    "name" VARCHAR(30) NOT NULL,
    "type" VARCHAR(5) DEFAULT 'remix',
    "project_id" INT REFERENCES project,
    last_update TIMESTAMP DEFAULT LOCALTIMESTAMP
);

CREATE TABLE "url" (
	id SERIAL PRIMARY KEY,
	song_id INT REFERENCES song,
	mp3_url VARCHAR(500),
	wav_url VARCHAR(500),
	production_url VARCHAR(500),
	production_type VARCHAR(6)
);