// import * as sockethandler from '../services/handle_socket';

// SOCKETS
const UPDATE_SOCKET_COUNT = "UPDATE_SOCKET_COUNT"
const NEW_TEACHER_QUESTION = "NEW_TEACHER_QUESTION"
const DISPLAY_NEW_TEACHER_QUESTION = "DISPLAY_NEW_TEACHER_QUESTION"
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
    roomName: ''
};

export default function reducer(state = initialState, action) {
    // console.log("REDUCER HIT: " + JSON.stringify(action));
    switch (action.type) {
        // case SUBSCRIBE_TO_CLASSROOM:
        //     console.log("USER SUBSCRIBED TO CLASSROOM", state.studentsPresent, ++state.studentsPresent);
        //     return Object.assign({}, state, {studentsPresent: ++state.studentsPresent});
        // case LEAVE_CLASSROOM:
        //     console.log("USER LEFT CLASSROOM", state.studentsPresent, --state.studentsPresent)
        //     return Object.assign({}, state, {studentsPresent: --state.studentsPresent});
        case UPDATE_SOCKET_COUNT:
            console.log("UPDATE_SOCKET_COUNT", action.payload);
            return Object.assign({}, state, {studentsPresent: action.payload, roomName: action.roomName});
        case NEW_TEACHER_QUESTION:
            return Object.assign({}, state, {socketQuestions: [...state.socketQuestions, action.payload]})
        case DISPLAY_NEW_TEACHER_QUESTION:
            return {...state, socketQuestions: [...state.socketQuestions, action.payload]}
            
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

// export function displayNewTeacherQuestion(value) {
//     console.log('reducer function value: ' + value)
    
//     return function(dispatch) {
//       dispatch(
//     {
//         type: 'DISPLAY_NEW_TEACHER_QUESTION',
//         payload: value
//       });
//     };
//   }

export function displayNewTeacherQuestion(questionText) {
    // console.log("reducer: displayNewTeacherQuestion hit", questionText);
    // debugger
    return {
        type: DISPLAY_NEW_TEACHER_QUESTION,
        payload: questionText
    }
}
