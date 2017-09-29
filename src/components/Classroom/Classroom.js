import React, { Component } from 'react';
import Header from '../Header/Header';
import Subheader from '../Subheader/Subheader';
import NewQuestion from '../NewQuestion/NewQuestion';
import List from '../List/List';
import {
    listenForJoinedRoom,
    listenForUpdateSocketCount,
    listenForNewQuestion,
    listenForGiveRoomCount,
    //  listenForSuccessfulSocketConnection_Student,
    //  listenForSuccessfulSocketConnection_Student,
    listenForSuccessfulSocketConnection,
    // emitDisconnect,
    emitGetRoomCount
} from '../../services/handle_sockets';
import { connect } from 'react-redux';
import { getQuestions, getLive } from '../../ducks/backend_reducer';
import { updateSocketCount, displayNewTeacherQuestion } from '../../ducks/sockets_reducer';
import './Classroom.css';
// import io from 'socket.io-client';


// const clientside = io.connect('http://localhost:4000/')


class Classroom extends Component {
    constructor(props) {
        super(props)
        
        // console.log(this.props)
        listenForJoinedRoom();
        listenForUpdateSocketCount(this.props.updateSocketCount);
        listenForGiveRoomCount(this.props.updateSocketCount);
        listenForNewQuestion(this.props.displayNewTeacherQuestion);

        if (this.props.userIsInstructor) {
            listenForSuccessfulSocketConnection("instructor", this.props.class_sessionID)
        } else {
            listenForSuccessfulSocketConnection("student", this.props.class_sessionID)
        }
        console.log(this.props.class_sessionID);
    }

    componentWillMount(props) {
    }


    componentDidMount(props) {


        // === false) {
        //     listenForSuccessfulSocketConnection_Student(userType)
        // } else {
        //     listenForSuccessfulSocketConnection_Teacher(this.props.class_sessionID)
        // }
        // debugger;
        // console.log("component Mounted");
        // listenForUserTypeRequest(userType);
        // joinRoom();

        // const userIsInstructor = localStorage.getItem("userIsInstructor")
        // if (userIsInstructor) {
        //     this.props.initializeUser();
        // }
    }

    numQuestions(props) {
        {if (this.props.socketQuestions.length < 1) { 
            return " No questions yet."
        } else if (this.props.socketQuestions.length == 1) {
            return " 1 question so far."
        } else {
            return " " + (this.props.socketQuestions.length) + " questions asked so far."}
        }
    }



    render() {
        // console.log(this.props);
        // console.log(this.props.userIsInstructor)
        if (this.props.class_sessionID !== '') {
            emitGetRoomCount(this.props.class_sessionID)
        }



        return (
            <div>
                <div><Header /></div>
                <div><Subheader /></div>
                <div className="present_count">

                    {this.props.studentsPresent} {(this.props.studentsPresent === 1) ? "person" : "people"} here.
                    {this.numQuestions()}
                    </div>
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

    componentWillUnmount() {
        // emitDisconnect(this.props.class_sessionID)
    }
}


function mapStateToProps(state) {
    // return state
    // console.log(state)
    return {
        currentView: state.views.currentView,
        recordQuestion: state.recordQuestion,
        questions: state.data.questions,
        loading: state.data.loading,
        live: state.data.live,
        class_sessionID: state.data.class_sessionID,
        studentsPresent: state.sockets.studentsPresent,
        socketQuestions: state.sockets.socketQuestions,
        userIsInstructor: state.data.userIsInstructor
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         updateSocketCount: (socketCount) => dispatch(updateSocketCount(socketCount))
//     }
// }

export default connect(mapStateToProps, { getQuestions, getLive, updateSocketCount, displayNewTeacherQuestion })(Classroom);
// export default connect(mapStateToProps, { getQuestions })(Classroom);
