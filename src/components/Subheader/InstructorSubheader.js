import React, { Component } from 'react';
import GoLive from '../GoLive/GoLive';
import Actions from '../Actions/Actions';
import { connect } from 'react-redux';
import { recordCurrentText, recordNewQuestion } from '../../ducks/backend_reducer';

class InstructorSubheader extends Component {

    displayInputFieldsController(props) {
        if (this.props.live === false) {
            return (
                <div className="subheader">
                    <div className="subheader_dynamic_portion_item" id="top_margin"><input placeholder={"Instructor name"} onChange={(e) => this.props.recordCurrentText(e.target.value, "instructorName")} value={this.props.instructorName} /></div>
                    <div className="subheader_dynamic_portion_item"><input placeholder={"Today's topic..."} onChange={(e) => this.props.recordCurrentText(e.target.value, "classTopic")} value={this.props.classTopic} /></div>
                    <div className="subheader_dynamic_portion_item"><GoLive /></div>
                </div>
            )
        } else {
            return  <div className="subheader">
                    <div id="hideMe">
                    <div className="subheader_instructor_welcome greeting">
                        Welcome, {this.props.instructorName ? this.props.instructorName : "instructor"}! {'   '}
                        <b>Topic</b>: <i>{this.props.classTopic ? this.props.classTopic : "Class topic"}</i>
                    </div>
                    </div>
                    <div className="subheader_dynamic_portion_item"><Actions /></div>
                    </div>
        }
    }

    render() {



        return (
            <div>
                {this.displayInputFieldsController()}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        currentView: state.views.currentview,
        instructorName: state.data.instructorName,
        classTopic: state.data.classTopic,
        live: state.data.live
    }
}

export default connect(mapStateToProps, { recordCurrentText, recordNewQuestion })(InstructorSubheader);