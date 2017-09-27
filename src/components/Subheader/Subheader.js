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
        // const style = {
        //     margin: 12,
        // };

        // var dynamicPortion;
        // if (this.props.userType === 'instructor') {
        //     dynamicPortion = <InstructorSubheader />
        // } else {
        //     dynamicPortion = <StudentSubheader />
        // }

        return this.props.userIsInstructor ? <InstructorSubheader /> : <StudentSubheader />
            // <div>
            //     <div>

            
                {/* </div>
            </div> */}
        
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