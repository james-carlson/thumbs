import React, { Component } from 'react';
import Header from '../Header/Header';
import Subheader from '../Subheader/Subheader';
import NewQuestion from '../NewQuestion/NewQuestion';
import List from '../List/List';
import { listenForClassroomNameRequest,
         listenForUpdateSocketCount,
         listenForRoomNameRequest,
         listenForUserTypeRequest } from '../../services/handle_sockets';
import { connect } from 'react-redux';
import { getQuestions } from '../../ducks/backend_reducer';
import { updateSocketCount } from '../../ducks/sockets_reducer';
// import { updateSocketCount } from '../../api';
import './Classroom.css';
// import io from 'socket.io-client';


// const clientside = io.connect('http://localhost:4000/')


class Classroom extends Component {
    constructor(props) {
        super(props)

        listenForUpdateSocketCount(this.props.updateSocketCount);
        listenForClassroomNameRequest(props.displayNewTeacherQuestion, this.props.class_sessionID);
        listenForRoomNameRequest(this.props.class_sessionID);
        
    }
    
    
    componentDidMount(props) {
        var userType = (this.props.userIsInstructor === false? "student" : "instructor");
        console.log(userType);
        listenForUserTypeRequest(userType);
    }
    
    
    
    
    render() {
        console.log(this.props);
        
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
        socketQuestions: state.data.socketQuestions,
        userIsInstructor: state.data.userIsInstructor
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         updateSocketCount: (socketCount) => dispatch(updateSocketCount(socketCount))
//     }
// }

export default connect(mapStateToProps, { getQuestions, updateSocketCount })(Classroom);
// export default connect(mapStateToProps, { getQuestions })(Classroom);
