import axios from 'axios';

export const recordNewQuestion = function (questionText, class_sessionID) {
    console.log("At the data handler: " + questionText, class_sessionID)
    console.log("passing in the body: " + JSON.stringify({ "questiontext": questionText, "class_sessionID": class_sessionID }))
    return axios.post('/api/data/new-teacher-question', { "questiontext": questionText, "class_session_id": class_sessionID })
        .then(res => res.data)
}


export const generateRandomID = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    // console.log(text);
    // emitClassSessionId(text);
    return text;
}

export const goLive = function (class_sessionID, instructorName, classTopic) {
    // console.log("goLive handler generated ID: " + class_sessionID, instructorName, classTopic)
    return axios.post('/api/data/new-class-session', {
        "class_session_id": class_sessionID,
        "instructorName": instructorName,
        "classTopic": classTopic
    }).then(res => res.data)

}

export const getLive = function (class_sessionID) {
    console.log("getLive handler class_session_ID: " + class_sessionID)
    return axios.get(`/api/data/class_sessions/${class_sessionID}`)
    .then(res => res.data);
    // .then(payload => payload.data);


}

