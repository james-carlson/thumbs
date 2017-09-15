import axios from 'axios';

export const recordNewQuestion = function (questionText, class_sessionID) {
    console.log("At the data handler: " + questionText, class_sessionID)
    console.log("passing in the body: " + JSON.stringify({ "questiontext": questionText, "class_sessionID": class_sessionID }))
    return axios.post('http://localhost:4000/api/data/new-teacher-question', { "questiontext": questionText, "class_sessionID": class_sessionID })
        .then(res => console.log(res.data))
}

export const getQuestions = function () {
    return axios.get('http://localhost:4000/api/data/questions/session/teacher')
        .then(res => res.data)
}

export const generateRandomID = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    // console.log(text);
    return text;
}

export const goLive = function (value) {
    console.log("goLive handler generated ID: " + value)
    return axios.post('http://localhost:4000/api/data/new-class-session', {
        "url_id": value
    }).then(res => res.data)

}