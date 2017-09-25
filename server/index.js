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

massive(connectionInfo).then(db => { app.set('db', db) })
    .catch( err => { console.log(err)})


// 3. BODY-PARSER
app.use( bodyParser.json() );


// 4. CORS
app.use(cors());


//THE RIGHT ORDER (ALWAYS FOLLOW)
//express session
//passport
//passport - session
//passport - strategy



// 5. START SERVER
var server = app.listen(port, function(){
    console.log('server listening on ' + port);
    
})


// SERVE STATIC FILES
// var path = 'app/server/'
app.use(express.static('public'));

// ENDPOINTS
var roomName = '';

// GO_LIVE (New Class Session)
app.post('/api/data/new-class-session', function(req, res, next) {
    // console.log(req.body)
    const {class_session_id, instructorName, classTopic } = req.body
    roomName = class_session_id;
    req.app.get('db').queries.newClassSession(class_session_id, instructorName, classTopic)
    .then( data => res.status(200).send(res.data))
    // .catch(err => { res.status(500).send(err)})
        // 'New class session created. Questions and responses will be logged.').status(200);
    // console.log(req.body.url_id);
})

// Get live class session
app.get('/api/data/class_sessions/:class_session_id', function(req, res, next) {
    console.log(JSON.stringify(req.params.class_session_id));
    console.log(req.params.class_session_id);
    req.app.get('db').queries.startClass(req.params.class_session_id)
    .then( data => {
        res.status(200).send(data[0]);
        console.log(data[0])})
    .catch(err => { res.status(500).send(err)})
    // const {class_session_id} = req.params
})

// New Teacher Question
app.post('/api/data/new-teacher-question', questions.add, function ( req, res, next ) {
    req.app.get('db').queries.getAllQuestionsForSession()
    .then(data => res.status(200).send(data))
    .catch(err => { res.status(500).send(err)})    
});
//  [( req, res, next ) => {
//     console.log("add thing hit in module exports")
//     const { questiontext , class_session_id } = req.body

//     req.app.get('db').queries.recordNewTeacherQuestion([questiontext, class_session_id])
//     .then( data => res.status(200).send(res.data))
// } , ] );

// New Student Question
app.post('/api/data/new-student-question', function(req, res){
    res.send(['New student question created.']).status(200)
})

// Get Teacher Question by ID
app.get('/api/data/questions/teacher/:id', function(req, res){
    res.send({'id': 'Object of questions!', 'id': 'Sooooo many questions!'}).status(200)
})

// Get Student Question by ID
app.get('/api/data/questions/student/:id', function(req, res){
    res.send({'id': 'Object of questions!', 'id': 'Sooooo many questions!'}).status(200)
})

// Get All Teacher Questions for Session
app.get('/api/data/questions/session/teacher', questions.refresh );

// function ( req, res, next ) {
//     req.app.get('db').queries.getAllQuestionsForSession()
//     .then(data => res.status(200).send(data))
//     .catch(err => { res.status(500).send(err)})   
// }


// Get All Student Questions for Session
app.get('/api/data/questions/session/student', function(req, res){
    res.send({'id': 'Object of questions!', 'id': 'Sooooo many questions!'}).status(200)
})




// Socket setup
var io = socket(server);
var socketCount = 0;
var socketID = '';
var classroom = '';

io.on('connection', (serverside) => {
    serverside.emit('getClassroom')
    serverside.on('giveClassroom', function(data){
        console.log("given classRoom:" + data)
    })
    socketCount++
    socketID = serverside.id;
    console.log("Somebody joined:" + socketCount, socketID);
    serverside.emit('updateSocketCount', { socketID, socketCount})

    serverside.on('disconnect', function () {
        socketCount--,
        serverside.emit('studentLeft', socketCount);
      });

    serverside.on('getSocketCount', function(){
        console.log("Client has asked for socket count. It's " + socketCount);
        serverside.emit('tellSocketCount', socketCount);
    });

    serverside.emit("studentJoined", "Welcome, " + serverside.id, (data) => {
        ++studentsPresent

        console.log(data);
    });
    // console.log("a user connected", socket.id);

    serverside.emit("ferret", "tobi", (data) => {
        console.log(data);
    });
    
    serverside.on('newQuestion', function() {
        console.log("joined classroom: " + serverside.id);
        serverside.emit('message');
    } );



});

