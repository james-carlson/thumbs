import io from 'socket.io-client';
const clientside = io('http://localhost:4000');


export function listenForSuccessfulSocketConnection(userType, roomName) {
        clientside.on('connectionDetected', function (data) {
            console.log("connection detected", data);
            // clientside.emit('joinRoom', { "userType": userType, "roomName": roomName })
        })
}

export function listenForSuccessfulSocketConnection_Student() {
        clientside.on('connectionDetected', function (data) {
            console.log("connection detected", data);
            clientside.emit('joinRoom', { "userType": "student", "roomName": "tbd" })
        })
}

export function emitJoinRoom(userType, roomName) {
    if (userType !== undefined && roomName !== undefined) {
        console.log('clientside emitJoinRoom emitted', userType, roomName);
        // clientside.on('connectionDetected', function () {
            clientside.emit('joinRoom', { "userType": userType, "roomName": roomName })
        // })
    }
}

export function listenForJoinedRoom() {
    clientside.on('joinedRoom', function (data) {
        clientside.emit('getRoomCount', data)
    })
}

export function emitGetRoomCount() {
    console.log('attempting to get room count');
    clientside.emit("getRoomCount")
};

export function listenForGiveRoomCount(cb) {
    clientside.on("giveRoomCount", function (data) {
        console.log("New room count " + data);
        cb(data.socketCount, data.roomName);
    })
}

export function listenForUserTypeRequest(data) {
    console.log('listenForUserTypeRequest: userType: ', data);
    clientside.on('requestUserType', function () {
        clientside.emit('tellUserType', data);
    }
    )

}

export function listenForNewQuestion(cb) {
    clientside.on("addNewTeacherQuestion", function (data) {
        console.log("event addNewTeacherQuestion received from server")
        console.log("question text", data)
        // props.displayNewTeacherQuestion("Whatever")
        console.log(data)
        cb(data)
    });
}

export function listenForUpdateSocketCount(cb) {
    clientside.on("updateSocketCount", function (data) {
        console.log("Somebody joined " + data.socketCount);
        cb(data.socketCount, data.roomName);
    })
}

export function emitClassSessionId(data) {
    console.log("socket function: emitClassSessionId, data: ", data);
    clientside.emit("giveServerClassSessionId", data)
};

export function broadcastNewTeacherQuestion(data) {
    clientside.emit("newTeacherQuestion", data)
};

export function emitAnswer(data) {
    console.log(data);
    clientside.emit("newAnswer", data)
}

export function listenForNewQuestionScore(cb) {
    clientside.on('newQuestionScore', (data) => {
    cb(data)})
};
// CAN I COMBINE ALL LISTENING FUNCTIONS?
// export function masterListener(data, cb, userType) {
//     clientside.on('connectionDetected', function () {
//         clientside.emit('joinRoom', { "userType": userType })
//     })

//     clientside.on('joinedRoom', function (data) {
//         clientside.emit('getRoomCount', data)
//     })

//     clientside.on("giveRoomCount", function (data) {
//         console.log("New room count " + data);
//         cb(data.socketCount, data.roomName);
//     })

//     clientside.on('requestUserType', function () {
//         console.log('listenForUserTypeRequest: userType: ', data);
//         clientside.emit('tellUserType', data);
//     })


//     clientside.on("addNewTeacherQuestion", function (data) {
//         console.log("event addNewTeacherQuestion received from server")
//         console.log("question text", data)
//         // props.displayNewTeacherQuestion("Whatever")
//         cb(data)
//     })

//     clientside.on("updateSocketCount", function (data) {
//         console.log("Somebody joined " + data.socketCount);
//         cb(data.socketCount, data.roomName);
//     })

// }