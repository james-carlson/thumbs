import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class StudentHeader extends Component {
    render () {
        return (
            <div className="student_header">
                Student Header.
                <div>{this.props.instructorName}this.props.instructorName</div>
                <div>{this.props.instructorTopic}this.props.instructorTopic</div>
                <div>{this.props.inSession}this.props.inSessionNow</div>
            </div>
        );
    }
}