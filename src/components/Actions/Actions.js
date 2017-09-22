import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goLive } from '../../ducks/backend_reducer';
import { toggleDisplayNewQuestionBox } from '../../ducks/view_reducer';
import './Actions.css';

class Actions extends Component {
    constructor(props) {
        super(props)

        this.actionsDisplayControl = this.actionsDisplayControl.bind(this);
    }

    actionsDisplayControl(props) {
        if (this.props.live === false) {
            return <div>Enter your information and go live to share this Thumbs session with others.</div>
        } else {
            return (
                <div className="subheader_dynamic_portion_item ">
                    <div className="action_button_wrapper">
                        <button onClick={() => this.props.toggleDisplayNewQuestionBox()}>Ask New Question</button>
                        {/* <button onClick={() => this.props.getQuestions(this.props.userType, 'instructor')}>View Responses</button> */}
                        <button onClick={() => this.props.getQuestions(this.props.userType, 'student')}>See Student Questions</button>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="subheader_dynamic_portion_item">
                {this.actionsDisplayControl()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        live: state.data.live,
        class_sessionID: state.data.class_sessionID,
        displayNewQuestionBox: state.views.displayNewQuestionBox
    }
}

export default connect(mapStateToProps, { toggleDisplayNewQuestionBox })(Actions);