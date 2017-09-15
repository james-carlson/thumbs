import React, { Component } from 'react';
import './NewQuestion.css';
import { connect } from 'react-redux';
import { recordCurrentText, recordNewQuestion } from '../../ducks/backend_reducer';
import { viewInitial } from '../../ducks/view_reducer';

class NewQuestion extends Component {
    
    render () {
        var questiontype = (this.props.currentView === 'teacherNewQuestion'? 'teacher' : 'student')
        return (
            <div className="NewQuestion">
                <div>This div pops up for a new {questiontype} question.</div>
                <div><textarea rows="10" cols="50" onChange={ (e) => this.props.recordCurrentText(e.target.value)}/></div>
                <div>
                    <button onClick={ (e) => this.props.recordNewQuestion(this.props.currentText, this.props.class_sessionID)}>Ask</button>
                    <button onClick={ () => this.props.viewInitial() }>Cancel</button>
                    {this.props.currentText}{this.props.class_sessionID}
                </div>
                <div></div>
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        currentText: state.data.currentText,
        questionID: state.data.questionID,
        currentView: state.views.currentView,
        class_sessionID: state.data.class_sessionID
    }
}

export default connect ( mapStateToProps, { recordCurrentText, recordNewQuestion, viewInitial } )( NewQuestion );