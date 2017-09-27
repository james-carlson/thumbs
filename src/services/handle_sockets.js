import io from 'socket.io-client';
const clientside = io('http://localhost:4000');

// Listeners
export function listenForUserTypeRequest(data){
    console.log('listenForUserTypeRequest: userType: ', data);
    clientside.on('requestUserType', function () {
        clientside.emit('tellUserType', data);
    }
    )

}

// export function listenForClassroomNameRequest(cb, data){
//     clientside.on("getClassroom", function () {
//     console.log("This class_sessionID", data);
//     clientside.emit("giveClassroom", data)
// });
// }

export function listenForNewQuestion(cb, data) {
    clientside.on("addNewTeacherQuestion", function (data) {
    console.log("event addNewTeacherQuestion received from server")
    console.log("question text", data)
    // props.displayNewTeacherQuestion("Whatever")
    cb(data)
});
}

export function listenForUpdateSocketCount(cb) {
    clientside.on("updateSocketCount", function(data) {
        console.log("Somebody joined: " + data.socketCount);
        cb(data.socketCount);
    })
}

// export function listenForRoomNameRequest(cb){
//     clientside.on('requestRoomName', function joinRoom(class_sessionID){
//         clientside.emit('joinRoom', class_sessionID);
//     })
// }


// Emit-only
export function emitClassSessionId(data) {
    console.log("socket function: emitClassSessionId, data: ", data);
    clientside.emit("giveServerClassSessionId", data)
};

export function broadcastNewTeacherQuestion(message) {
    clientside.emit("newTeacherQuestion", message)
};

export function joinRoom(){
    clientside.emit('joinRoom', console.log("Joining room..."));
}
