BEGIN;

DROP TABLE IF EXISTS users, work, play CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE work (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    work_time INTEGER,
    time_posted TIMESTAMPTZ
);

CREATE TABLE play (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    play_time INTEGER,
    time_posted TIMESTAMPTZ
);


COMMIT;
