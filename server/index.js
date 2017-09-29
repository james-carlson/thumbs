require('dotenv').config();

const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , path = require('path')
    , questions = require('./controllers/questions')
    , socket = require('socket.io')
    ;

var port = 4000;

// 1. EXPRESS
const app = express();


// 2. MASSIVE
// const connectionInfo = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT, 
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
// }

const connectionInfo = process.env.DB_CONNECTIONSTRING

let database;
massive(connectionInfo).then((db) => {
    // console.log(db);rs
    database = db;
    app.set('db', db)
})
    .catch(err => { console.log(err) })


// 3. BODY-PARSER
app.use(bodyParser.json());


// 4. CORS
app.use(cors());


//THE RIGHT ORDER (ALWAYS FOLLOW)
//express session
//passport
//passport - session
//passport - strategy



// 5. START SERVER
var server = app.listen(port, function () {
    console.log('server listening on ' + port);

})


// SERVE STATIC FILES
// var path = 'app/server/'
app.use(express.static('public'));

// ENDPOINTS
var roomName = '';

// GO_LIVE (New Class Session)
app.post('/api/data/new-class-session', function (req, res, next) {
    // console.log(req.body)
    const { class_session_id, instructorName, classTopic } = req.body
    roomName = class_session_id;
    req.app.get('db').queries.newClassSession(class_session_id, instructorName, classTopic)
        .then(data => res.status(200).send(res.data))
    // .catch(err => { res.status(500).send(err)})
    // 'New class session created. Questions and responses will be logged.').status(200);
    // console.log(req.body.url_id);
})

// Get live class session
app.get('/api/data/class_sessions/:class_session_id', function (req, res, next) {
    // console.log(JSON.stringify(req.params.class_session_id));
    // console.log(req.params.class_session_id);
    req.app.get('db').queries.startClass(req.params.class_session_id)
        .then(data => {
            res.status(200).send(data[0]);
            // console.log(data[0])
        })
        .catch(err => { res.status(500).send(err) })
    // const {class_session_id} = req.params
})

// New Teacher Question
app.post('/api/data/new-teacher-question', questions.add, function (req, res, next) {
    req.app.get('db').queries.getAllQuestionsForSession()
        .then(data => res.status(200).send(data))
        .catch(err => { res.status(500).send(err) })
});
//  [( req, res, next ) => {
//     console.log("add thing hit in module exports")
//     const { questiontext , class_session_id } = req.body

//     req.app.get('db').queries.recordNewTeacherQuestion([questiontext, class_session_id])
//     .then( data => res.status(200).send(res.data))
// } , ] );

// New Student Question
app.post('/api/data/new-student-question', function (req, res) {
    res.send(['New student question created.']).status(200)
})

// Get Teacher Question by ID
app.get('/api/data/questions/teacher/:id', function (req, res) {
    res.send({ 'id': 'Object of questions!', 'id': 'Sooooo many questions!' }).status(200)
})

// Get Student Question by ID
app.get('/api/data/questions/student/:id', function (req, res) {
    res.send({ 'id': 'Object of questions!', 'id': 'Sooooo many questions!' }).status(200)
})

// Get All Teacher Questions for Session
app.get('/api/data/questions/session/teacher', questions.refresh);

// function ( req, res, next ) {
//     req.app.get('db').queries.getAllQuestionsForSession()
//     .then(data => res.status(200).send(data))
//     .catch(err => { res.status(500).send(err)})   
// }


// Get All Student Questions for Session
app.get('/api/data/questions/session/student', function (req, res) {
    res.send({ 'id': 'Object of questions!', 'id': 'Sooooo many questions!' }).status(200)
})




// Socket setup
var io = socket(server);
var socketCount = 0;
var roomName = ''
var socketID = '';
var classroom = '';
var classrooms = [];
var teacherSocketID = '';
var clientsInRoom = 0;


io.on('connection', (serverside) => {
    serverside.emit('connectionDetected', serverside.id, console.log('connectionDetected', serverside.id));
    serverside.on('joinRoom', data => {
        console.log(data.userType + " requested to join room" + data.roomName + ". (socketID: " + serverside.id + ")")

        // Save socket ID
        socketID = serverside.id

        // if user is student, get room name off of the URL
        if (data["userType"] === "student") {
            var refererSplit = serverside.request.headers.referer.split('/');
            roomName = refererSplit[refererSplit.length - 1]; //Room name is at the end of the path.

        } else if (data["userType"] === "instructor") {
            var teacherSocketID = socketID
            roomName = data["roomName"]
        }

        // join room
        serverside.join(roomName);
        io.to(roomName).emit('joinedRoom')
        io.to(roomName).emit("giveRoomCount", { socketCount: io.sockets.adapter.rooms[roomName].length, roomName: roomName })
        console.log(serverside.id + " successfully joined room " + roomName);
    });

    // emit updated count of people in room
    serverside.on("getRoomCount", function () {
        console.log('room count requested')
        if (roomName !== '') {
            if (io.sockets.adapter.rooms[roomName] !== undefined) {
                clientsInRoom = io.sockets.adapter.rooms[roomName].length
                io.to(roomName).emit("giveRoomCount emitted", { socketCount: io.sockets.adapter.rooms[roomName].length, roomName: roomName })
                console.log("line 250:", roomName, "has", clientsInRoom);
            }
        }
    });

    // IDEA: same endpoint (e.g. teacher New Question) but then it sees your user type and then behaves appropriately. so there's one action type and each is processed and fed out to whoever it should be.
    // Endpoints to catch both cases (e.g. teacher and student) in the front end.

    // TEACHER endpoints
    // go live


    // if userType is teacher:
    serverside.on('newTeacherQuestion', function (data) {
        database.queries.newTeacherQuestion(data.roomName, data.questionText)
            .then(res => {
                // console.log(res)
                // console.log("New Teacher saved to " + roomName + " with data: " + data))
                    serverside.to(roomName).emit('addNewTeacherQuestion', (res[0]))
                console.log("new teacher question emitted from client: " + serverside.id + " to room: " + roomName + " data: " + data);
            })
    })


    // STUDENT endpoints
    // if userType is student
    serverside.on('newQuestion', function () {
        console.log("joined classroom: " + serverside.id);
        serverside.emit('message');
    });

    serverside.on('disconnect', function () {
        // console.log("clientsInRoom: ", clientsInRoom)
        // serverside.to(roomName).emit("giveRoomCount", {socketCount: clientsInRoom, roomName: roomName})
        console.log("Socket disconnected: " + serverside.id + "roomName: " + roomName)
        if (roomName !== '') {
            if (io.sockets.adapter.rooms[roomName] !== undefined) {
                clientsInRoom = io.sockets.adapter.rooms[roomName].length
                io.to(roomName).emit("giveRoomCount", { socketCount: io.sockets.adapter.rooms[roomName].length, roomName: roomName })
                console.log("line 250:", roomName, "has", clientsInRoom);
            }
        }
    });


})








