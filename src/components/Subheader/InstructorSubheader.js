import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import TextField from 'material-ui/TextField';
import GoLive from '../GoLive/GoLive';
import Actions from '../Actions/Actions';
import { connect } from 'react-redux';
import { recordCurrentText, recordNewQuestion, getQuestions } from '../../ducks/backend_reducer';

class InstructorSubheader extends Component {

    displayInputFieldsController(props) {
        if (this.props.live === false) {
            return (
                <div className="subheader">
                    <div className="subheader_dynamic_portion_item"><input placeholder={"Instructor name"} onChange={(e) => this.props.recordCurrentText(e.target.value, "instructorName")} value={this.props.instructorName} /></div>
                    <div className="subheader_dynamic_portion_item"><input placeholder={"Today's topic..."} onChange={(e) => this.props.recordCurrentText(e.target.value, "classTopic")} value={this.props.classTopic} /></div>
                    <div className="subheader_dynamic_portion_item"><GoLive /></div>
                </div>
            )
        } else {
            return <div className="subheader_dynamic_portion_item"><Actions /></div>
        }
    }

    render() {



        return (
            <div className="subheader">
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

export default connect(mapStateToProps, { recordCurrentText, recordNewQuestion, getQuestions })(InstructorSubheader);