import React, { Component } from 'react';
import './List.css';
// import axios from 'axios';
// import { getQuestions } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
import { displayNewTeacherQuestion } from '../../ducks/sockets_reducer'
// import { listenForNewQuestion } from '../../services/handle_sockets';
import StudentAnswerOptions from '../StudentAnswerOptions/StudentAnswerOptions';


class List extends Component {


    displayQuestionAnswers(){
        return <div>ANSWERS</div> 
    }

    displayController() {
        // console.log("display controller invoked");
        if (this.props.socketQuestions.length === 0) {
            return <div className="no_data_to_list">New questions will appear here.</div>
        } else {
            return (this.props.socketQuestions.map((questions, i) => (
                <div className="list_box" key={i}>
                {/* { this.props.userIsInstructor ? "" : "On a scale from 1 to 5," }   */}
                    <div>{questions}</div>
                { this.props.userIsInstructor ? this.displayQuestionAnswers() :
                 <StudentAnswerOptions 
                 userIsInstructor={false} 
                 socketQuestions={this.props.socketQuestions} 
                 db_q_id={this.props.db_q_id} /> }
                </div>)))
        }

    }



    render() {

        // console.log(this.props);
        return (
            <div className="list_spacer">
                {this.displayController()}
                </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        questions: state.data.questions,
        loading: state.data.loading,
        live: state.data.live,
        socketQuestions: state.sockets.socketQuestions,
        newQuestionText: state.data.newQuestionText,
        userIsInstructor: state.data.userIsInstructor,
        db_q_id: state.sockets.db_q_id
    }
}

// const mapDispatchToProps = dispatch =>
// (
//     {
//         displayNewTeacherQuestion: (data) => {dispatch(displayNewTeacherQuestion(data))},
//         getQuestions: () => {dispatch(getQuestions())}
//     }
// )

export default connect(mapStateToProps, { displayNewTeacherQuestion })(List);