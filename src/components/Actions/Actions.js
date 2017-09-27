import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { goLive } from '../../ducks/backend_reducer';
import { toggleDisplayNewQuestionBox } from '../../ducks/view_reducer';
import './Actions.css';
import link from '../Subheader/link_icon.svg';

class Actions extends Component {
    constructor(props) {
        super(props)

        this.actionsDisplayControl = this.actionsDisplayControl.bind(this);
    }

    goToQueue(){
        window.open("https://q.devmountain.com/#/studentDashboard", "The Queue");
    }

    actionsDisplayControl(props) {
        if (this.props.userIsInstructor === 'instructor') {
            if (this.props.live === false) {
                return <div>Enter your information and go live to share this Thumbs session with others.</div>
            } else {
                return (
                    <div className="subheader_dynamic_portion_item ">
                        <div className="action_button_wrapper">
                            <button onClick={() => this.props.toggleDisplayNewQuestionBox()}>Ask A Question</button>
                            <button onClick={() => this.props.getQuestions(this.props.userType, 'student')}>See Student Questions</button>
                        </div>
                    </div>
                )
            }
        } else {
            return(<div className="subheader_dynamic_portion_item ">
            <div className="action_button_wrapper">
                <button onClick={() => this.props.toggleDisplayNewQuestionBox()}>Ask A Question</button>
                <button onClick={() => this.goToQueue()}>The Queue &#x2197;</button>
            </div>
        </div>)

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
        displayNewQuestionBox: state.views.displayNewQuestionBox,
        userIsInstructor: state.data.userIsInstructor
    }
}

export default connect(mapStateToProps, { toggleDisplayNewQuestionBox })(Actions);