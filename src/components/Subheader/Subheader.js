import React, { Component } from 'react';
import './Subheader.css';
import { viewStudentQuestion, viewQuestionResponses } from '../../ducks/view_reducer';
import { connect } from 'react-redux';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import SessionInfo from '../SessionInfo/SessionInfo';
import InstructorSubheader from '../Subheader/InstructorSubheader';
import StudentSubheader from '../Subheader/StudentSubheader';

class Subheader extends Component {
    render() {

        var dynamicPortion;
        if (this.props.userIsInstructor === true) {
            dynamicPortion = <InstructorSubheader />
        } else {
            dynamicPortion = <StudentSubheader />
        }

        return (<div>
            {dynamicPortion}
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        currentView: state.views.currentView,
        userIsInstructor: state.data.userIsInstructor,
        live: state.data.live

    }
}

export default connect(mapStateToProps, { viewStudentQuestion, viewQuestionResponses })(Subheader);