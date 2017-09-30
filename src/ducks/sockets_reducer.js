// import * as sockethandler from '../services/handle_socket';

// SOCKETS
const UPDATE_SOCKET_COUNT = "UPDATE_SOCKET_COUNT"
const UPDATE_QUESTION_AVERAGE = "UPDATE_QUESTION_AVERAGE"
const DISPLAY_NEW_TEACHER_QUESTION = "DISPLAY_NEW_TEACHER_QUESTION"
// const NEW_TEACHER_QUESTION = "NEW_TEACHER_QUESTION"
// const SUBSCRIBE_TO_CLASSROOM_PENDING = "SUBSCRIBE_TO_CLASSROOM_PENDING"
// const SUBSCRIBE_TO_CLASSROOM_FULFILLED = "SUBSCRIBE_TO_CLASSROOM_FULFILLED"
// const RECEIVE_TIMESTAMP = "RECEIVE_TIMESTAMP"
// const VIEW_QUESTION_RESPONSES = "VIEW_QUESTION_RESPONSES"
// const HANDLE_NEW_SOCKET_CONNECTION = "HANDLE_NEW_SOCKET_CONNECTION"

const initialState = { 
    studentsPresent: 0,
    socketQuestions: [],
    teacherQuestions: [],
    studentQuestions: [],
    db_q_id: [],
    roomName: '',
    questionAverages: {}
};

export default function reducer(state = initialState, action) {
    // console.log("REDUCER HIT: " + JSON.stringify(action));
    switch (action.type) {
        case UPDATE_SOCKET_COUNT:
            console.log("UPDATE_SOCKET_COUNT", action.payload);
            return Object.assign({}, state, {studentsPresent: action.payload, roomName: action.roomName});
        case UPDATE_QUESTION_AVERAGE:
            console.log("UPDATE_QUESTION_AVERAGE", action.payload);
            return {...state, questionAverages: {...state.questionAverages, [action.payload.questionid]:action.payload.avg } }
        case DISPLAY_NEW_TEACHER_QUESTION:
            console.log(action.type, action.payload);
            return {...state, 
                socketQuestions: [...state.socketQuestions, action.payload],
                db_q_id: [...state.db_q_id, action.payload.id]
                    }
            
        default:
            return state;
    }
}

export function updateSocketCount(numSockets, roomName) {
    console.log("reducer: updateSocketCount hit");
    console.log("count param value: " + numSockets);
    return {
        type: UPDATE_SOCKET_COUNT,
        payload: numSockets,
        roomName: roomName
    }
}

export function newTeacherQuestion(questionText) {
    console.log("reducer: newTeacherQuestion hit", questionText);
    // return {
    //     type: NEW_TEACHER_QUESTION,
    //     payload: questionText
    // }
}


export function displayNewTeacherQuestion(data) {
    // console.log("reducer: displayNewTeacherQuestion hit", questionText);
    // debugger
    console.log("display: ", JSON.stringify(data));
    return {
        type: DISPLAY_NEW_TEACHER_QUESTION,
        payload: data
    }
}

export function updateQuestionAverage(data) {
    console.log(JSON.stringify(data));
    return {
        type: UPDATE_QUESTION_AVERAGE,
        payload: data
    }
}