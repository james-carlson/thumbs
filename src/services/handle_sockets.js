import io from 'socket.io-client';
const clientside = io('http://localhost:4000');

// Listeners
export function listenForNewQuestion(cb, data) {
    clientside.on("addNewTeacherQuestion", function (data) {
    console.log("event addNewTeacherQuestion received from server")
    console.log("question text", data)
    // props.displayNewTeacherQuestion("Whatever")
    cb(data)
});
}

export function listenForClassroomNameRequest(cb, data){
    clientside.on("getClassroom", function () {
    console.log("This class_sessionID", data);
    clientside.emit("giveClassroom", data)
});
}


// Emit-only
export function emitClassSessionId(data) {
    console.log("socket function: emitClassSessionId, data: ", data);
    clientside.emit("giveServerClassSessionId", data)
};

export function broadcastNewTeacherQuestion(message) {
    clientside.emit("newTeacherQuestion", message)
};

