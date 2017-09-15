CREATE DATABASE IF NOT EXISTS thumbs;

CREATE TABLE IF NOT EXISTS class_sessions 
(   id SERIAL PRIMARY KEY,
    url_id TEXT   
    instructor TEXT,
    topic TEXT,
    startdate TEXT,
    finishdate TEXT,
    starttime TEXT,
    finishtime TEXT
);

INSERT INTO class_sessions
(username, created_date)
VALUES
('devuser', 'today');

CREATE TABLE IF NOT EXISTS instructor_questions
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    created_date TEXT,
    sessionid INTEGER,
    questiontext TEXT,
    FOREIGN KEY (sessionid) REFERENCES class_sessions(id)
);

CREATE TABLE IF NOT EXISTS student_questions
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    created_date TEXT,
    sessionid INTEGER,
    questiontext TEXT,
    FOREIGN KEY (sessionid) REFERENCES class_sessions(id)
);

CREATE TABLE IF NOT EXISTS student_responses
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    created_date TEXT,
    questionid INTEGER,
    response_value INTEGER,
    FOREIGN KEY (questionid) REFERENCES instructor_questions(id)
);




