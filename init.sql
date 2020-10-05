BEGIN;

DROP TABLE IF EXISTS users, work, play CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE work (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    work_time INTEGER
);

CREATE TABLE play (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    play_time INTEGER
);

-- Insert data into table for testing

INSERT INTO users (username, password) VALUES
('TheBaddestB','beyonce'),
('Santa25', 'hoehoe'),
('CodeWizzard', 'npmInstall1')
;

INSERT INTO work (user_id, work_time) VALUES
(1,69),
(2,30),
(3,20)
;

INSERT INTO play (user_id, play_time) VALUES
(1,30),
(2,60),
(3,69)
;

COMMIT;
