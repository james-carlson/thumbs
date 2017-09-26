import React, { Component } from 'react';
import Header from '../Header/Header';
import Subheader from '../Subheader/Subheader';
import NewQuestion from '../NewQuestion/NewQuestion';
import List from '../List/List';
import { connect } from 'react-redux';
import { getQuestions } from '../../ducks/backend_reducer';
import { updateSocketCount } from '../../ducks/sockets_reducer';
// import { updateSocketCount } from '../../api';
import './Classroom.css';
import io from 'socket.io-client';
import { listenForClassroomNameRequest } from '../../services/handle_sockets';

const clientside = io.connect('http://localhost:4000/')


class Classroom extends Component {
    constructor(props) {
        super(props)
    
        listenForClassroomNameRequest(props.displayNewTeacherQuestion, this.props.class_sessionID);
    }


    componentDidMount(props) {
        
        // clientside.on("getClassroom", function () {
        //     console.log("This class_sessionID");
        //     clientside.emit("giveClassroom", "this.class_sessionID")
        // });

        // clientside.on("updateSocketCount", function(data){
        //     props.updateSocketCount(data.socketCount);
        //     console.log("Number of active sockets received from server: " + data.socketCount);
        // });
        this.socketController(this.props.updateSocketCount)

        // displaySocketCount = socketCount;
        // console.log("displaySocketCount: " + displaySocketCount)
        // this.clientside.on("ferret", (name, fn) => fn('woot' + name));
        // clientside.on("Test", (name, fn) => fn('woot' + test));
    }

    socketController(updateSockets) {

        clientside.on("updateSocketCount", function (data) {
            console.log("Somebody joined: " + data.socketCount);
            updateSockets(data.socketCount);
        });


        // var displaySocketCount = 0;
        // this.clientside.on("somebodyJoined", function(socketCount) {
        //     console.log("Somebody joined. SocketCount: " + socketCount);
        //     displaySocketCount = socketCount;
        //     console.log(displaySocketCount);
        //     // this.props.updateSocketCount(socketCount);
        // }); 
        // this.clientside.on("studentLeft", function(socketCount){
        //     console.log("Some buddy left. SocketCount: " + socketCount);
        //     displaySocketCount = socketCount
        //     console.log(displaySocketCount);
        //     // this.props.updateSocketCount(socketCount);
        // })


    }

    render() {
        
        
        return (
            <div>
                <div><Header /></div>
                <div><Subheader /></div>
                <div className="present_count">
                
                {this.props.studentsPresent} {(this.props.studentsPresent === 1)? "person" : "people"} here.</div>
                <div><NewQuestion /></div>
                <div className="classroom">
                <div><List /></div>
                            {/* <button onClick={this.socketController(this.props.updateSocketCount)}>Click here to display socket count</button> */}
                            {/* <button onClick={this.props.subscribeToClassroom}>Click here to join a classroom</button> */}

                            {/* <button onClick={this.props.getQuestions}>Get all the questions</button> */}

                        {/* {this.state.connectionCount} */}

                        {/* {this.classroomDisplayController()} */}
                        {/* <div>Timer: {this.props.subscribeToClassroom(this.props.receiveTimeStamp)}</div> */}
                        {/* <div>This is the classroom. The current view is: {this.props.currentView}. </div>
                        <div className={"inital " + (this.props.currentView !== 'initial' ? "hidden" : '')}>
                            This is displayed because the current view is the initial view.
                    </div>
                        <div className={"teacherNewQuestion " + (this.props.currentView !== 'teacherNewQuestion' ? "hidden" : '')}>
                            This is displayed because the current view is teacherNewQuestion.
                        </div>
                        <div className={"studentNewQuestion " + (this.props.currentView !== 'studentNewQuestion' ? "hidden" : '')}>
                            This is displayed because the current view is studentNewQuestion.
                        </div>
                        <div className={"allStudentQuestions " + (this.props.currentView !== 'allStudentQuestions' ? "hidden" : '')}>
                            This is displayed because the current view is allStudentQuestions. */}

                        {/* QUESTIONS:<br />
                            {JSON.stringify(this.props.questions)} */}
                        {/* 
                            <div>
                            </div>
                        </div>
                        <div className={"questionResponses " + (this.props.currentView !== 'questionResponses' ? "hidden" : '')}>
                            This is displayed because the current view is questionResponses.
                    </div>
                        <div>
                            <List />
                        </div> */}

                        </div>
                    </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        currentView: state.views.currentView,
        recordQuestion: state.recordQuestion,
        questions: state.data.questions,
        loading: state.data.loading,
        live: state.data.live,
        class_sessionID: state.data.class_sessionID,
        studentsPresent: state.sockets.studentsPresent,
        socketQuestions: state.data.socketQuestions
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         updateSocketCount: (socketCount) => dispatch(updateSocketCount(socketCount))
//     }
// }

export default connect(mapStateToProps, { getQuestions, updateSocketCount })(Classroom);
// export default connect(mapStateToProps, { getQuestions })(Classroom);
