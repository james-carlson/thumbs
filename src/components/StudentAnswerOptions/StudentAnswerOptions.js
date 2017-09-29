import React, { Component } from 'react';
import { emitAnswer } from '../../services/handle_sockets';

export default class StudentAnswerOptions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            answerSubmitted: false,
            answers: []
        }
    }

    handleAnswerSubmission(response) {
        console.log(this.props.db_q_id)
        console.log(this.props.socketQuestions)
        console.log(response)
        emitAnswer({questionid: this.props.db_q_id, responseVal: response})
        this.setState({ 
            answerSubmitted: true,
            answers: [...this.state.answers, response] 
         })
    }

    render() {
        // const answerArr = [1, 2, 3, 4, 5]

        return (
            <div>
                {!this.state.answerSubmitted
                    ?
                    <div className="answer_buttons">
                        <button onClick={() => this.handleAnswerSubmission(1)}>1</button>
                        <button onClick={() => this.handleAnswerSubmission(2)}>2</button>
                        <button onClick={() => this.handleAnswerSubmission(3)}>3</button>
                        <button onClick={() => this.handleAnswerSubmission(4)}>4</button>
                        <button onClick={() => this.handleAnswerSubmission(5)}>5</button>
                    </div>
                    : ''
                }
            </div>

                // {/* {   
                // answerArr.map((buttonDisplay, buttonVal)  =>
                //         <button key={buttonVal} onClick={() => this.handleAnswerSubmission(buttonVal)}>
                //             {buttonVal}
                //         </button>)
                // } */}
        );
    }
}