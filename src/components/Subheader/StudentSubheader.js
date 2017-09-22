import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class StudentSubheader extends Component {
    render () {
        const style = {
            margin: 12,
        };

        return (
            <div>
            <div className="student_subheader">Student Subheader
                <div>{this.props.instructorName}this.props.instructorName</div>
                <div>{this.props.classTopic}this.props.classTopic</div>
                <div>{this.props.inSession}this.props.inSessionNow</div>

            </div>
            <div>
            Students:
                        <MuiThemeProvider>
                            <RaisedButton label="Ask A Question" style={style} onClick={() => this.props.studentNewQuestion()} />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <a href="https://q.devmountain.com/#/studentDashboard"><RaisedButton label="Go To Queue" style={style} /></a>
                        </MuiThemeProvider>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentview: state.currentview
    }
}

export default connect(mapStateToProps)(StudentSubheader);