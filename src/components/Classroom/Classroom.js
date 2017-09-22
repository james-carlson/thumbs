import React, { Component } from 'react';
import Header from '../Header/Header';
import './Classroom.css';
import { connect } from 'react-redux';
import NewQuestion from '../NewQuestion/NewQuestion';
import { getQuestions } from '../../ducks/backend_reducer';
import List from '../List/List';
import { subscribeToClassroom } from '../../services/handle_socket';
import { receiveTimeStamp } from '../../services/handle_socket';
import io from 'socket.io-client';
let socket = io('http://localhost:4000');


class Classroom extends Component {
    constructor(props){
        super(props)
        this.state = {
            connectionCount: 0,
            message: ''
        }

    }

    componentDidMount() {
        this.props.getQuestions();
        
        
        }
    
    classroomDisplayController(props) {

    }

    socketController(props) {
        socket.on('getCount', res => {
            console.log(res)});
        socket.on('message', res => {
            console.log(res)});  
            // this.setState({connectionCount : res, message: message})
    }

    render() {

        return (
            <div>
                <Header />
                <div className="classroom">
                    <div>
                        <div><NewQuestion /></div>
                        {this.state.connectionCount}
                        {/* <div>Timer: {this.props.subscribeToClassroom(this.props.receiveTimeStamp)}</div> */}
                        <div>This is the classroom. The current view is: {this.props.currentView}. </div>
                        <div className={"inital " + (this.props.currentView !== 'initial' ? "hidden" : '')}>
                            This is displayed because the current view is the initial view.
                    </div>
                        <div className={"teacherNewQuestion " + (this.props.currentView !== 'teacherNewQuestion' ? "hidden" : '')}>
                            This is displayed because the current view is teacherNewQuestion.
                        </div>
                        <div className={"studentNewQuestion " + (this.props.currentView !== 'studentNewQuestion' ? "hidden" : '')}>
                            This is displayed because the current view is studentNewQuestion.
                        </div>
                        <div className={"allStudentQuestions " + (this.props.currentView !== 'allStudentQuestions' ? "hidden" : '')}>
                            This is displayed because the current view is allStudentQuestions.
                        <button onClick={this.props.getQuestions}>Get all the questions</button>
                            QUESTIONS:<br />
                            {JSON.stringify(this.props.questions)}

                            <div>
                            </div>
                        </div>
                        <div className={"questionResponses " + (this.props.currentView !== 'questionResponses' ? "hidden" : '')}>
                            This is displayed because the current view is questionResponses.
                    </div>
                        <div>
                            <List />
                        </div>


                    </div>

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        currentView: state.views.currentView,
        recordQuestion: state.recordQuestion,
        questions: state.data.questions,
        loading: state.data.loading,
        timestamp: state.data.timestamp
    }
}

export default connect(mapStateToProps, { getQuestions, subscribeToClassroom, receiveTimeStamp })(Classroom);
