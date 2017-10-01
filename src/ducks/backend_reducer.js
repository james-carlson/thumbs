import * as handler from '../services/handle_data';


// BACKEND/HANDLING DATA
// const RECORD_INSTRUCTOR_NAME = "RECORD_INSTRUCTOR_NAME"
// const RECORD_CLASS_TOPIC = "RECORD_CLASS_TOPIC"
const RECORD_CURRENT_TEXT = "RECORD_CURRENT_TEXT"
const RECORD_NEW_QUESTION = "RECORD_NEW_QUESTION"
const RECORD_NEW_QUESTION_PENDING = "RECORD_NEW_QUESTION_PENDING"
const RECORD_NEW_QUESTION_FULFILLED = "RECORD_NEW_QUESTION_FULFILLED"
// const GET_QUESTIONS = "GET_QUESTIONS"
const GET_QUESTIONS_PENDING = "GET_QUESTIONS_PENDING"
const GET_QUESTIONS_FULFILLED = "GET_QUESTIONS_FULFILLED"
const CREATE_NEW_CLASS_SESSION_ID = "CREATE_NEW_CLASS_SESSION_ID"
const GO_LIVE = "GO_LIVE"
const GO_LIVE_PENDING = "GO_LIVE_PENDING"
const GO_LIVE_FULFILLED = "GO_LIVE_FULFILLED"
const GET_LIVE = "GET_LIVE"
const GET_LIVE_PENDING = "GET_LIVE_PENDING"
const GET_LIVE_FULFILLED = "GET_LIVE_FULFILLED"
const END_LIVE = "END_LIVE"
const INITIALIZE_TEACHER = "INITIALIZE_TEACHER"
const RESET_DATA = "RESET_DATA"

const initialState = { 
    loading: false,
    live: false,
    class_sessionID: '',
    userIsInstructor: false,
    instructorName: '',
    classTopic: '',
    questionType: '',
    timestamp: 'no timestamp yet',
    newQuestionText: '',
    db_session_id: null,
    questions: [],
};

export default function reducer(state = initialState, action) {
    // console.log("REDUCER HIT: " + state, action);
    switch (action.type) {
        case CREATE_NEW_CLASS_SESSION_ID:
        return Object.assign({}, state, {loading: false, class_sessionID: action.payload});
        case RECORD_CURRENT_TEXT:
            // console.log("RECORD_CURRENT_TEXT" + JSON.stringify(action))
            return Object.assign({}, state, {[action.key]: action.payload});
        case RECORD_NEW_QUESTION:
            return Object.assign({}, state, {questionID: 'This should come from the database'});
        case RECORD_NEW_QUESTION_PENDING:
            return Object.assign({}, state, {questionID: 'This should come from the database'});
        case RECORD_NEW_QUESTION_FULFILLED:
            return Object.assign({}, state, {questionID: 'This should come from the database', response: ''});
        // case GET_QUESTIONS:
        //     return Object.assign({}, state, {loading: true});
        case GET_QUESTIONS_PENDING:
            return Object.assign({}, state, {loading: true});
        case GET_QUESTIONS_FULFILLED:
            return Object.assign({}, state, {loading: false, questions: action.payload});
        case END_LIVE:
            return Object.assign({}, state, {live: false});
        case GO_LIVE_PENDING:
            return Object.assign({}, state, {loading: true});
        case GO_LIVE_FULFILLED:
            return Object.assign({}, state, {loading: false, db_session_id: action.payload, live: true});
        case INITIALIZE_TEACHER:
            console.log(action.type, action.payload)
            return Object.assign({}, state, {userIsInstructor: true});
        case GET_LIVE_PENDING:
            console.log(action.type, action.payload)
            return Object.assign({}, state, {loading: true});
        case GET_LIVE_FULFILLED:
            console.log(action.type, action.payload)
            return Object.assign({}, state, 
                {loading: false, 
                db_session_id: action.payload.id, 
                instructorName: action.payload.instructor_name, 
                classTopic: action.payload.class_topic
                });
        case RESET_DATA:
            console.log(action.type, action.payload)
            return initialState
        default:
            return state;
    }
}



export function recordNewQuestion(questionText, class_sessionID, userType) {
    console.log("At the reducer: " + questionText, class_sessionID);
    return {
        type: RECORD_NEW_QUESTION,
        payload: handler.recordNewQuestion(questionText, class_sessionID),
        questionType: userType
    }
}

export function recordCurrentText(value, stateproperty) {
    // console.log("recording current text: " + value, stateproperty)
    return {
        type: RECORD_CURRENT_TEXT,
        payload: value,
        key: stateproperty
        }
}

// export function getQuestions(userType) {
//     if (userType === 'instructor') {
//         return {
//             type: GET_QUESTIONS,
//             payload: handler.getQuestions('instructor')
//         }
//     } else {
//         return {
//             type: GET_QUESTIONS,
//             payload: handler.getQuestions()
//         }
//     }

// }

export function generateRandomID() {
        return {
            type: CREATE_NEW_CLASS_SESSION_ID,
            payload: handler.generateRandomID()
        }
    }

export function goLive(class_sessionID, instructorName, classTopic) {
    return {
        type: GO_LIVE,
        payload: handler.goLive(class_sessionID, instructorName, classTopic),
    }
}

export function getLive(class_sessionID) {
    console.log('getLive reducer');
    return {
        type: GET_LIVE,
        payload: handler.getLive(class_sessionID)
    }
}

export function endLive(generatedID) {
    return {
        type: END_LIVE
    }
}

export function initializeUser() {
    // localStorage.setItem("userIsInstructor", true)
    return {
        type: INITIALIZE_TEACHER
    }
}

export function resetData() {
    return {
        type: RESET_DATA
    }
}



