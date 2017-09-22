import React, { Component } from 'react';
import './NewQuestion.css';
import { connect } from 'react-redux';
import { recordCurrentText, recordNewQuestion } from '../../ducks/backend_reducer';
import { viewInitial, toggleDisplayNewQuestionBox } from '../../ducks/view_reducer';

class NewQuestion extends Component {

    askButton(e, callback) {
        console.log('hit the Ask button', e);
        (e) => { this.props.recordNewQuestion(this.props.newQuestionText, this.props.class_sessionID) };
        callback();
    }



    newQuestionBoxController() {
        console.log(this.props.displayNewQuestionBox);
        if (this.props.displayNewQuestionBox === false) {
            return ""
        } else {
            return (
                <div className="new_question_container">
                    <h3>New Question:</h3>
                    <div className="new_question_container_textarea_box">
                    <textarea placeholder="Type your question." onChange={(e) => this.props.recordCurrentText(e.target.value, "newQuestionText")} required />
                    </div>
                    <div className="new_question_container_buttons_box">
                        <div><button id="cancel" onClick={() => this.props.toggleDisplayNewQuestionBox()}>Cancel</button></div>
                        <div><button id="ask" onClick={(e) => this.askButton(e, this.props.toggleDisplayNewQuestionBox)}>Ask</button></div>
                    </div>
                </div>
            )
        }
    }

    render() {

        return (
            <div>{this.newQuestionBoxController()}</div>
        );
    }

}

function mapStateToProps(state) {
    return {
        currentText: state.data.currentText,
        questionID: state.data.questionID,
        currentView: state.views.currentView,
        class_sessionID: state.data.class_sessionID,
        userType: state.data.userType,
        displayNewQuestionBox: state.views.displayNewQuestionBox
    }
}

export default connect(mapStateToProps, { recordCurrentText, recordNewQuestion, viewInitial, toggleDisplayNewQuestionBox })(NewQuestion);