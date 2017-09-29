import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { goLive } from '../../ducks/backend_reducer';
import { toggleDisplayNewQuestionBox } from '../../ducks/view_reducer';
import './Actions.css';


class Actions extends Component {

    actionsDisplayControl(props) {
        if (this.props.userIsInstructor === true) {
                return (
                    <div className="subheader_dynamic_portion_item ">
                        <div className="action_button_wrapper">
                            <button onClick={() => this.props.toggleDisplayNewQuestionBox()}>Ask A Question</button>
                            <button onClick={() => this.props.getQuestions(this.props.userType, 'student')}>See Student Questions</button>
                        </div>
                    </div>
                )
        } else {
            return(<div className="subheader_dynamic_portion_item ">
            <div className="action_button_wrapper">
                <button onClick={() => this.props.toggleDisplayNewQuestionBox()}>Ask A Question</button>
                <button onClick={() => window.open("https://q.devmountain.com/#/studentDashboard", "The Queue")}>The Queue &#x2197;</button>
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