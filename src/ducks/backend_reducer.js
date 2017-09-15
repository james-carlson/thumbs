import * as handler from '../services/handle_data';
import * as socket from '../services/handle_socket';

// BACKEND/HANDLING DATA
const RECORD_CURRENT_TEXT = "RECORD_CURRENT_TEXT"
const RECORD_NEW_QUESTION = "RECORD_NEW_QUESTION"
const RECORD_NEW_QUESTION_PENDING = "RECORD_NEW_QUESTION_PENDING"
const RECORD_NEW_QUESTION_FULFILLED = "RECORD_NEW_QUESTION_FULFILLED"
const GET_QUESTIONS = "GET_QUESTIONS"
const GET_QUESTIONS_PENDING = "GET_QUESTIONS_PENDING"
const GET_QUESTIONS_FULFILLED = "GET_QUESTIONS_FULFILLED"
const CREATE_NEW_CLASS_SESSION_ID = "CREATE_NEW_CLASS_SESSION_ID"
const GO_LIVE = "GO_LIVE"
const GO_LIVE_PENDING = "GO_LIVE_PENDING"
const GO_LIVE_FULFILLED = "GO_LIVE_FULFILLED"
const INITIALIZE_USER_TYPE = "INITIALIZE_USER_TYPE"

// SOCKETS
const SUBSCRIBE_TO_CLASSROOM = "SUBSCRIBE_TO_CLASSROOM"
// const SUBSCRIBE_TO_CLASSROOM_PENDING = "SUBSCRIBE_TO_CLASSROOM_PENDING"
// const SUBSCRIBE_TO_CLASSROOM_FULFILLED = "SUBSCRIBE_TO_CLASSROOM_FULFILLED"
const RECEIVE_TIMESTAMP = "RECEIVE_TIMESTAMP"

const initialState = { 
    loading: false,
    questions: [],
    class_sessionID: '',
    currentText: '',
    db_session_id: null,
    userType: '',
    timestamp: 'no timestamp yet'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RECORD_CURRENT_TEXT:
            return Object.assign({}, state, {currentText: action.payload});
        // case RECORD_NEW_QUESTION:
        //     return Object.assign({}, state, {questionID: 'This should come from the database'});
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
        case CREATE_NEW_CLASS_SESSION_ID:
            return Object.assign({}, state, {loading: false, class_sessionID: action.payload});
        // case GO_LIVE:
        //     return Object.assign({}, state, {loading: true});
        case GO_LIVE_PENDING:
            return Object.assign({}, state, {loading: true});
        case GO_LIVE_FULFILLED:
            return Object.assign({}, state, {loading: false, db_session_id: action.payload});
        case INITIALIZE_USER_TYPE:
            console.log(action.payload)
            return Object.assign({}, state, {userType: action.payload});
        // case SUBSCRIBE_TO_CLASSROOM_PENDING:
        //     return Object.assign({}, state, {loading: true});
        // case SUBSCRIBE_TO_CLASSROOM_FULFILLED:
        //     return Object.assign({}, state, {loading: false, timestamp: action.value});
        case SUBSCRIBE_TO_CLASSROOM:
            console.log("case statement SUBSCRIBE TO CLASSROOM")
            return Object.assign({}, state, {timestamp: action.payload});
        case RECEIVE_TIMESTAMP:
            console.log("case statement RECEIVE TIMESTAMP")
            return Object.assign({}, state, {timestamp: action.payload});
        default:
            return state;
    }
}

export function recordNewQuestion(questionText, class_sessionID) {
    console.log("At the reducer: " + questionText, class_sessionID);
    return {
        type: RECORD_NEW_QUESTION,
        payload: handler.recordNewQuestion(questionText, class_sessionID)
    }
}

export function recordCurrentText(value) {
    return {
        type: RECORD_CURRENT_TEXT,
        payload: value
    }
}

export function getQuestions() {
    return {
        type: GET_QUESTIONS,
        payload: handler.getQuestions()
    }
}

export function generateRandomID() {
        return {
            type: CREATE_NEW_CLASS_SESSION_ID,
            payload: handler.generateRandomID()
        }
    }

export function goLive(generatedID) {
    return {
        type: GO_LIVE,
        payload: handler.goLive(generatedID)
    }
}

export function initializeUser(typeOfUser) {
    console.log('reducer function typeOfUser: ' + typeOfUser);
    return {
        type: INITIALIZE_USER_TYPE,
        payload: typeOfUser
    }
}

export function subscribeToClassroom() {
    console.log("reducer: subscribeToClassroom hit");
    return {
        type: SUBSCRIBE_TO_CLASSROOM,
        payload: socket.subscribeToClassroom()
    }
}

export function receiveTimeStamp() {
    console.log('reducer: receiveTimeStamp hit');
    return {
        type: RECEIVE_TIMESTAMP,
        payload: socket.receiveTimeStamp()
    }
}

