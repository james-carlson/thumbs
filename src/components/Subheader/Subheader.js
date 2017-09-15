import React, { Component } from 'react';
import './Subheader.css';
import { teacherNewQuestion, studentNewQuestion, viewStudentQuestion, viewQuestionResponses } from '../../ducks/view_reducer';
import { connect } from 'react-redux';


class Subheader extends Component {
    render() {
        return (
            <div>
                <div className="sub_header">
                    <div>
                        Teachers: 
                        <button onClick={ () => this.props.teacherNewQuestion() }>Ask Question</button> 
                        {/* <button onClick={ () => this.props.viewQuestionResponses() }>View Feedback</button> */}
                        <button onClick={ () => this.props.viewStudentQuestion() }>Student Questions</button><br />
                        Students: 
                        <button onClick={ () => this.props.studentNewQuestion() }>Ask a Question</button> 
                        <a href="https://q.devmountain.com/#/studentDashboard"><button>Q</button></a> 
                        <a href="https://devmountain.difference-engine.com/#/courses"><button>LMS</button></a></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        currentview: state.currentview
    }
}

export default connect ( mapStateToProps, { teacherNewQuestion, studentNewQuestion, viewStudentQuestion, viewQuestionResponses } )( Subheader );