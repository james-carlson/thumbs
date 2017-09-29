DROP TABLE student_responses;
DROP TABLE student_questions;
DROP TABLE instructor_questions;
DROP TABLE class_sessions;


CREATE TABLE IF NOT EXISTS class_sessions 
(   id SERIAL PRIMARY KEY,
    class_session_id TEXT,   
    instructor_name TEXT,
    class_topic TEXT,
    startdate TEXT,
    finishdate TEXT,
    starttime TEXT,
    finishtime TEXT
);

INSERT INTO class_sessions
(instructor_name, startdate)
VALUES
('devuser', 'today');

CREATE TABLE IF NOT EXISTS instructor_questions
(
    id SERIAL PRIMARY KEY,
    session_id TEXT,
    instructor_name TEXT,
    questiontext TEXT,
    created_date TEXT
    -- FOREIGN KEY (session_id) REFERENCES class_sessions(id)
);

CREATE TABLE IF NOT EXISTS student_questions
(
    id SERIAL PRIMARY KEY,
    session_id TEXT,
    roomName TEXT,
    socket_id TEXT,
    questiontext TEXT,
    created_date TEXT
    -- FOREIGN KEY (session_id) REFERENCES class_sessions(id)
);

CREATE TABLE IF NOT EXISTS student_responses
(
    id SERIAL PRIMARY KEY,
    session_id TEXT,
    socket_id TEXT,
    question_id INTEGER,
    response INTEGER,
    created_date TEXT
    -- FOREIGN KEY (question_id) REFERENCES instructor_questions(id)
    -- FOREIGN KEY (session_id) REFERENCES class_sessions(id)
);

