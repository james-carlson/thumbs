// import * as sockethandler from '../services/handle_socket';

// SOCKETS
const SUBSCRIBE_TO_CLASSROOM = "SUBSCRIBE_TO_CLASSROOM"
const LEAVE_CLASSROOM = "LEAVE_CLASSROOM"
const UPDATE_SOCKET_COUNT = "UPDATE_SOCKET_COUNT"
// const SUBSCRIBE_TO_CLASSROOM_PENDING = "SUBSCRIBE_TO_CLASSROOM_PENDING"
// const SUBSCRIBE_TO_CLASSROOM_FULFILLED = "SUBSCRIBE_TO_CLASSROOM_FULFILLED"
// const RECEIVE_TIMESTAMP = "RECEIVE_TIMESTAMP"
// const VIEW_QUESTION_RESPONSES = "VIEW_QUESTION_RESPONSES"
// const HANDLE_NEW_SOCKET_CONNECTION = "HANDLE_NEW_SOCKET_CONNECTION"

const initialState = { 
    studentsPresent: 0
};

export default function reducer(state = initialState, action) {
    // console.log("REDUCER HIT: " + JSON.stringify(action));
    switch (action.type) {
        case SUBSCRIBE_TO_CLASSROOM:
            console.log("USER SUBSCRIBED TO CLASSROOM", state.studentsPresent, ++state.studentsPresent);
            return Object.assign({}, state, {studentsPresent: ++state.studentsPresent});
        case LEAVE_CLASSROOM:
            console.log("USER LEFT CLASSROOM", state.studentsPresent, --state.studentsPresent)
            return Object.assign({}, state, {studentsPresent: --state.studentsPresent});
        case UPDATE_SOCKET_COUNT:
            console.log("UPDATE_SOCKET_COUNT", action.payload);
            console.log(JSON.stringify(state));
            return Object.assign({}, state, {studentsPresent: action.payload});
        default:
            return state;
    }
}

export function updateSocketCount(numSockets) {
    console.log("reducer: updateSocketCount hit");
    console.log("count param value: " + numSockets);
    return {
        type: UPDATE_SOCKET_COUNT,
        payload: numSockets
    }
}

export function subscribeToClassroom() {
    console.log("reducer: subscribeToClassroom hit");
    return {
        type: SUBSCRIBE_TO_CLASSROOM
    }
}

export function leaveClassroom() {
    console.log("reducer: leaveClassroom hit");
    return {
        type: LEAVE_CLASSROOM
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

// export function generateRandomID() {
//         return {
//             type: CREATE_NEW_CLASS_SESSION_ID,
//             payload: handler.generateRandomID()
//         }
//     }

// export function goLive(class_sessionID, instructorName, classTopic) {
//     return {
//         type: GO_LIVE,
//         payload: handler.goLive(class_sessionID, instructorName, classTopic),
//     }
// }

// export function endLive(generatedID) {
//     return {
//         type: END_LIVE
//     }
// }

// export function initializeUser(typeOfUser) {
//     return {
//         type: INITIALIZE_USER_TYPE,
//         payload: typeOfUser
//     }
// }



// export function receiveTimeStamp() {
//     console.log('reducer: receiveTimeStamp hit');
//     return {
//         type: RECEIVE_TIMESTAMP,
//         payload: socket.receiveTimeStamp()
//     }
// }

