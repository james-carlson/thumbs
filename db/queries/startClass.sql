select id, instructor_name, class_topic
from class_sessions
where class_session_id = ($1);
