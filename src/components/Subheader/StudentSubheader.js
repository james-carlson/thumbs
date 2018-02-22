import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../Actions/Actions';
import { listenForSuccessfulSocketConnection_Student } from '../../services/handle_sockets';


class StudentSubheader extends Component {
    constructor(props) {
        super(props);
        
        listenForSuccessfulSocketConnection_Student();

    }
    render() {

        return (
            <div className="subheader">
                <div className="top_padding"><b>Instructor:</b> {this.props.instructorName}<span id="medium_space"></span>
                <b>Topic:</b> {this.props.classTopic}</div>
                <div className="subheader_dynamic_portion_item"><Actions /></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentview: state.views.currentview,
        live: state.data.live,
        instructorName: state.data.instructorName,
        classTopic: state.data.classTopic
    }
}

export default connect(mapStateToProps)(StudentSubheader);