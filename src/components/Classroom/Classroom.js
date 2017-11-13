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
    listenForNewStudentQuestions,
    listenForNewQuestionScore
} from '../../services/handle_sockets';
import { connect } from 'react-redux';
import { getLive } from '../../ducks/backend_reducer';
import { updateSocketCount, displayNewTeacherQuestion, updateQuestionAverage, addNewStudentQuestion } from '../../ducks/sockets_reducer';
import './Classroom.css';
import io from 'socket.io-client';


const clientside = io();


class Classroom extends Component {
    constructor(props) {
        super(props)

        // console.log(this.props)
        listenForJoinedRoom();
        listenForUpdateSocketCount(this.props.updateSocketCount);
        listenForGiveRoomCount(this.props.updateSocketCount);
        listenForNewQuestion(this.props.displayNewTeacherQuestion);
        listenForNewQuestionScore(this.props.updateQuestionAverage);
        if (this.props.userIsInstructor) {
            listenForSuccessfulSocketConnection("instructor", this.props.class_sessionID)
            listenForNewStudentQuestions(this.props.addNewStudentQuestion)
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

        if (this.props.teacherQuestions.length < 1) {
            return " No questions yet."
        } else if (this.props.teacherQuestions.length === 1) {
            return " 1 question so far."
        } else {
            return " " + (this.props.teacherQuestions.length) + " questions so far."
        }

    }

    studentMessageController(props) {
        if (!this.props.userIsInstructor) {
            if (this.props.teacherQuestions.length < 1) {
                return (
                    <div className="welcome_content">
                        <p><b>What's Thumbs?</b><br />
                            Thumbs is a companion environment to the classroom, where students can answer questions anonymously.</p>

                        <p><b>What's wrong with our physical thumbs and regular questions?</b><br />
                            Nothing! Except you lie sometimes.</p>

                        <p><b>What?!</b><br />
                            Remember that one time you didn't really understand yet, but when the instructors asked for "thumbs," you gave a solid thumbs up anyway? (Don't worry, we've all done it.) Thumbs lets everyone win -- you can save a little face, and your instructors get a better idea of what's going on.</p>
                    </div>
                )

            }
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
                    {this.studentMessageController()}
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
        teacherQuestions: state.sockets.teacherQuestions,
        userIsInstructor: state.data.userIsInstructor,
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         updateSocketCount: (socketCount) => dispatch(updateSocketCount(socketCount))
//     }
// }

export default connect(mapStateToProps, { getLive, updateSocketCount, displayNewTeacherQuestion, updateQuestionAverage, addNewStudentQuestion })(Classroom);
// export default connect(mapStateToProps, { getQuestions })(Classroom);
