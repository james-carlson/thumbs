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
        console.log(response)
        emitAnswer({questionid: this.props.questionid, responseVal: response})
        this.setState({ 
            answerSubmitted: true,
            answers: [...this.state.answers, response] 
         })
    }

    render() {
        const answerArr = [1, 2, 3, 4, 5]

        return (
            <div>
                {!this.state.answerSubmitted
                    ? <div className="answer_buttons">
                        { answerArr.map(buttonVal => 
                            <button key={buttonVal} onClick={() => this.handleAnswerSubmission(buttonVal)}>
                             {buttonVal}
                         </button>)
                        }
                    </div>
                    : ''
                }
            </div>

        );
    }
}