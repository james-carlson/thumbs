import React, { Component } from 'react';
import './List.css';
// import axios from 'axios';
import { getQuestions } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
import { displayNewTeacherQuestion } from '../../ducks/sockets_reducer';
import { listenForNewQuestion } from '../../services/handle_sockets';



class List extends Component {
    constructor(props){
        super(props)
        // this.handleNewQuestion = this.handleNewQuestion.bind(this);
        listenForNewQuestion(props.displayNewTeacherQuestion, this.props.newQuestionText);
    }

    subscribeToSockets(cb){
        // clientside.on("addNewTeacherQuestion", function (questionText) {
        //     console.log("event addNewTeacherQuestion received from server")
        //     displayNewTeacherQuestion(questionText)
        // });
    }

    displayController() {
        // console.log("display controller invoked");
        if (this.props.socketQuestions.length === 0) {
            return <div className="no_data_to_list">New questions will appear here.</div>
        } else {
        return (this.props.socketQuestions.map((questions, i) => (
                <div className="list_box" key={i}>
                    <div>{questions}</div>
                </div>)))
        }

    } 

    

    render() {

        // console.log(this.props);
        return (
                <div className="list_spacer">
                    {this.displayController()}
                    {this.props.socketQuestions.length} total questions.
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
        live: state.data.live,
        socketQuestions: state.sockets.socketQuestions,
        newQuestionText: state.data.newQuestionText
    }
}

// const mapDispatchToProps = dispatch =>
// (
//     {
//         displayNewTeacherQuestion: (data) => {dispatch(displayNewTeacherQuestion(data))},
//         getQuestions: () => {dispatch(getQuestions())}
//     }
// )

export default connect ( mapStateToProps, { displayNewTeacherQuestion })( List );