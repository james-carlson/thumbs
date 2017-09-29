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
    listenForSuccessfulSocketConnection,
    emitGetRoomCount,
    listenForNewQuestionScore
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
        listenForNewQuestionScore();
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
    }

    numQuestions(props) {
        
        if (this.props.socketQuestions.length < 1) {
            return " No questions yet."
        } else if (this.props.socketQuestions.length === 1) {
            return " 1 question so far."
        } else {
            return " " + (this.props.socketQuestions.length) + " questions so far."
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
                <div><List /></div>
                <div className="classroom">
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
