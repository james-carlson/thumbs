SELECT AVG(response)
FROM student_responses
WHERE question_id = ($1);