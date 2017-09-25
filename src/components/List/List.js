import React, { Component } from 'react';
import './List.css';
// import axios from 'axios';
import { getQuestions } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';

class List extends Component {


    displayController() {
        if (this.props.questions.length === 0) {
            return <div>Your questions will appear here.</div>
        }

        if (this.props.live === true) {
            return (this.props.questions.map((questions, i) => (
                <div className="questionbox" key={i}>
                    <div><b>Question #{questions.id}</b></div>
                    <div>{questions.questiontext}</div>
                </div>)))
        }

    } 

    render() {


        return (
                <div>
                    QUESTIONS:
                    {this.displayController()}
                </div>
        );
    }
}


function mapStateToProps( state ) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        questions: state.data.questions,
        loading: state.data.loading,
        live: state.data.live
    }
}

export default connect ( mapStateToProps, { getQuestions } )( List );