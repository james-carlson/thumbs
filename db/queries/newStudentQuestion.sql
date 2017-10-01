
INSERT INTO student_questions
(session_id, questiontext)
VALUES
($1, $2)
RETURNING id, session_id, questiontext 