CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    email VARCHAR (100) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);