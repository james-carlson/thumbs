import React, { Component } from 'react';
import './NewQuestion.css';
import { connect } from 'react-redux';
import { recordCurrentText, recordNewQuestion, getQuestions } from '../../ducks/backend_reducer';
import { viewInitial, toggleDisplayNewQuestionBox } from '../../ducks/view_reducer';
// import { newTeacherQuestion } from '../../ducks/sockets_reducer';
import { broadcastNewTeacherQuestion } from '../../services/handle_sockets';
import { displayNewTeacherQuestion } from '../../ducks/sockets_reducer';


class NewQuestion extends Component {

    askButton(e) {
        console.log('record new question:');
        this.props.recordNewQuestion(this.props.newQuestionText, this.props.class_sessionID);
        console.log('toggling display');
        this.props.toggleDisplayNewQuestionBox();
        console.log('getting questions');
        this.props.getQuestions();
    }

    askButton2(e) {
        console.log('record new question:');
        this.props.newTeacherQuestion(this.props.newQuestionText)
        // this.props.recordNewQuestion(this.props.newQuestionText, this.props.class_sessionID);
        // console.log('toggling display');
        this.props.toggleDisplayNewQuestionBox();
        console.log('getting questions');
        // this.props.getQuestions();
    }

    askButton3 = () => {
        broadcastNewTeacherQuestion(this.props.newQuestionText)
        this.props.toggleDisplayNewQuestionBox();
        this.props.displayNewTeacherQuestion(this.props.newQuestionText);
        // this.props.getQuestions();
    }

    // recordQuestionText(e) {
    //     console.log(e);
    //     var currentQuestionText = {"currentQuestionText": e};
    //     console.log(currentQuestionText)
    //     return currentQuestionText
    // }

    newQuestionBoxController() {
        // if (this.props.live === true) {
            if (this.props.displayNewQuestionBox === false) {
                return ""
            } else {
                return (
                    <div className="new_question_container">
                        <h3>New Question:</h3>
                        <div className="new_question_container_textarea_box">
                        <textarea placeholder="Type your question." onChange={(e) => this.props.recordCurrentText(e.target.value, "newQuestionText")} required />
                        {/* <textarea placeholder="Type your question." onChange={(e) => this.recordQuestionText(e.target.value)} required /> */}
                        </div>
                        <div className="new_question_container_buttons_box">
                            <div><button id="cancel" onClick={() => this.props.toggleDisplayNewQuestionBox()}>Cancel</button></div>
                            <div><button id="ask" onClick={this.askButton3}>Ask</button></div>
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
        userIsInstructor: state.data.userIsInstructor
    }
}

export default connect(mapStateToProps, { recordCurrentText, recordNewQuestion, viewInitial, toggleDisplayNewQuestionBox, getQuestions, displayNewTeacherQuestion })(NewQuestion);