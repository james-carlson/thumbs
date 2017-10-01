import React, { Component } from 'react';
import './NewQuestion.css';
import { connect } from 'react-redux';
import { recordCurrentText, recordNewQuestion } from '../../ducks/backend_reducer';
import { viewInitial, toggleDisplayNewQuestionBox } from '../../ducks/view_reducer';
// import { newTeacherQuestion } from '../../ducks/sockets_reducer';
import { broadcastNewTeacherQuestion, broadcastNewStudentQuestion } from '../../services/handle_sockets';
import { displayNewTeacherQuestion } from '../../ducks/sockets_reducer';


class NewQuestion extends Component {

    askButton = () => {
        if (this.props.userIsInstructor){
            broadcastNewTeacherQuestion({roomName: this.props.class_sessionID, questionText: this.props.newQuestionText});
        } else {
            broadcastNewStudentQuestion({roomName: this.props.class_sessionID, questionText: this.props.newQuestionText});
        }

        this.props.toggleDisplayNewQuestionBox();
    }


    newQuestionBoxController() {
        // if (this.props.live === true) {
            if (this.props.displayNewQuestionBox === false) {
                return ""
            } else {
                return (
                    <div className="new_question_container">
                        <div className="new_question_container_textarea_box">
                        <textarea placeholder="On a scale of 1 to 5..." onChange={(e) => this.props.recordCurrentText(e.target.value, "newQuestionText")} required />
                        </div>
                        <div className="new_question_container_buttons_box">
                            <div><button id="cancel" onClick={() => this.props.toggleDisplayNewQuestionBox()}>Cancel</button></div>
                            <div><button id="ask" onClick={this.askButton}>Ask</button></div>
                        </div>
                    </div>
                )
            }
        }
    // }
        
    

    render() {

        return (
            <div className="new_question_pre_container">{this.newQuestionBoxController()}</div>
        );
    }

}

function mapStateToProps(state) {
    return {
        live: state.data.live,
        currentText: state.data.currentText,
        questionID: state.data.questionID,
        currentView: state.views.currentView,
        class_sessionID: state.data.class_sessionID,
        newQuestionText: state.data.newQuestionText,
        displayNewQuestionBox: state.views.displayNewQuestionBox,
        socketQuestions: state.sockets.socketQuestions,
        userIsInstructor: state.data.userIsInstructor,
        instructorName: state.data.instructorName,
        classTopic: state.data.classTopic
    }
}

export default connect(mapStateToProps, { recordCurrentText, recordNewQuestion, viewInitial, toggleDisplayNewQuestionBox, displayNewTeacherQuestion })(NewQuestion);