import React, { Component } from 'react';
import './List.css';
// import axios from 'axios';
import { getQuestions } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';

class List extends Component {




    render() {
        const displayquestions = this.props.questions.map((questions, i) => (
            <div className="questionbox" key={i}>
                <div><b>Question #{questions.id}</b></div>
                <div>{questions.questiontext}</div>
            </div>))

        return (
            <div>Here be the list
                <div>
                    QUESTIONS:
                    {displayquestions}
                </div>
            </div>
        );
    }
}


function mapStateToProps( state ) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        questions: state.data.questions,
        loading: state.data.loading
    }
}

export default connect ( mapStateToProps, { getQuestions } )( List );