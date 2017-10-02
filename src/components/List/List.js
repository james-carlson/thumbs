import React, { Component } from 'react';
import './List.css';
// import axios from 'axios';
// import { getQuestions } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
import { displayNewTeacherQuestion } from '../../ducks/sockets_reducer'
// import { listenForNewQuestion } from '../../services/handle_sockets';
import StudentAnswerOptions from '../StudentAnswerOptions/StudentAnswerOptions';
import Gauge from '../../components/Gauge/Gauge';

class List extends Component {


    displayQuestionAnswers(id) {
        return <div>
            { isNaN(this.props.questionAverages[id]) ? '' : "Average: " + Math.round(this.props.questionAverages[id], 2) }<br />
            <Gauge id={id} avg={this.props.questionAverages[id]} />
        </div>

    }

    studentQuestionsDisplayController() {
        if (this.props.studentQuestions.length === 0) {
            return <div className="no_data_to_list">New questions will appear here.</div>
        } else {
            return (this.props.studentQuestions.map((question, i) => (
                <div className="list_box" key={question.id}>
                    <div>{question.questiontext}</div>

                    {/* 
                if functionality to talk back to students is desired, here's is where it would happen: 
                { this.props.userIsInstructor ? this.displayQuestionAnswers(question.id) :
                 <StudentAnswerOptions 
                 userIsInstructor={false} 
                 teacherQuestions={this.props.teacherQuestions} 
                 questionid={question.id} /> } */}
                </div>)))
        }
    }

    teacherQuestionsDisplayController() {
        console.log("questionAverages: ", this.props.questionAverages);
        console.log("teacherQuestions: ", this.props.teacherQuestions);
        if (this.props.teacherQuestions.length === 0) {
            return <div className="no_data_to_list">New questions will appear here.</div>
        } else {
            return (this.props.teacherQuestions.map((question, i) => (
                <div className="list_box" key={question.id}>
                    <div><b>Question:</b> "{question.questiontext}"</div>
                    {this.props.userIsInstructor ? this.displayQuestionAnswers(question.id) :
                        <StudentAnswerOptions
                            userIsInstructor={false}
                            teacherQuestions={this.props.teacherQuestions}
                            questionid={question.id} />}
                </div>)))
        }

    }



    render() {

        // console.log(this.props);
        return (
            <div className="list_spacer">
                {this.props.displayStudentQuestions ? this.studentQuestionsDisplayController() : this.teacherQuestionsDisplayController()}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        loading: state.data.loading,
        live: state.data.live,
        teacherQuestions: state.sockets.teacherQuestions,
        studentQuestions: state.sockets.studentQuestions,
        newQuestionText: state.data.newQuestionText,
        userIsInstructor: state.data.userIsInstructor,
        db_q_id: state.sockets.db_q_id,
        questionAverages: state.sockets.questionAverages,
        displayStudentQuestions: state.views.displayStudentQuestions
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