INSERT INTO student_responses
(question_id, response)
VALUES
($1, $2)
RETURNING question_id