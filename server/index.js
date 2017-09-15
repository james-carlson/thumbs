require('dotenv').config();

const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , path = require('path')
    , socket = require('socket.io')
;

var port = 4000;

const questions = require('../src/models/questions');

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
// GO_LIVE (New Class Session)
app.post('/api/data/new-class-session', function(req, res, next) {
    // console.log(req.body)
    // res.json(req.body)
    req.app.get('db').queries.newClassSession(req.body.url_id)
    .then( data => res.status(200).send(res.data))
    // .catch(err => { res.status(500).send(err)})
        // 'New class session created. Questions and responses will be logged.').status(200);
    // console.log(req.body.url_id);
})

// New Teacher Question
app.post('/api/data/new-teacher-question', function(req, res, next){
    req.app.get('db').queries.recordNewTeacherQuestion('wacka')
    res.send(`Question (${req.body.questiontext}) saved to the database.`).status(200)
})

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
app.get('/api/data/questions/session/teacher', ((req, res) => {
    req.app.get('db').queries.getAllQuestionsForSession()
        .then( data => res.status(200).send(data))
        .catch(err => { res.status(500).send(err)})
}))



// Get All Student Questions for Session
app.get('/api/data/questions/session/student', function(req, res){
    res.send({'id': 'Object of questions!', 'id': 'Sooooo many questions!'}).status(200)
})



// Socket setup
var io = socket(server);

io.on('connection', (client) => {    
    client.on('subscribeToClassroom', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        client.emit('subscribeSuccess') 
    });
});

