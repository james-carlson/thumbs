import io from 'socket.io-client';
let socket = io('http://localhost:4000');


export const subscribeToClassroom = function(cb) { 
    console.log('subscribeToClassroom on handle_socket fires');
    socket.on('subscribeSuccess', console.log('successful subscription recieved'));
    socket.emit('subscribeToClassroom', 5);
}


export const receiveTimeStamp = function(err, timestamp) { 
    console.log('receiveTimeStamp on handle_socket fires');
    return timestamp;
}


