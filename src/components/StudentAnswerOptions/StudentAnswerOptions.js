import React, { Component } from 'react';
import { emitAnswer } from '../../services/handle_sockets'; 

export default class StudentAnswerOptions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            answerSubmitted: false
        }
    }

    handleAnswerSubmission(response) {
        console.log(this.props.db_q_id)
        console.log(this.props.socketQuestions)
        console.log(response)
        emitAnswer()
        this.setState({ answerSubmitted: true })
    }

    render() {
        const answerArr = [1, 2, 3, 4, 5]

        return (
            <div className="answer_buttons">
                {/* !this.state.answerSubmitted  */}
                {/* {   
                answerArr.map((buttonDisplay, buttonVal)  =>
                        <button key={buttonVal} onClick={() => this.handleAnswerSubmission(buttonVal)}>
                            {buttonVal}
                        </button>)
                } */}
                <button onClick={() => this.handleAnswerSubmission(1)}>1</button>
                <button onClick={() => this.handleAnswerSubmission(2)}>2</button>
                <button onClick={() => this.handleAnswerSubmission(3)}>3</button>
                <button onClick={() => this.handleAnswerSubmission(4)}>4</button>
                <button onClick={() => this.handleAnswerSubmission(5)}>5</button>
            </div>
        );
    }
}