import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../Actions/Actions';
import { getQuestions, getLive } from '../../ducks/backend_reducer';
import { listenForSuccessfulSocketConnection_Student } from '../../services/handle_sockets';


class StudentSubheader extends Component {
    constructor(props) {
        super(props);

        // getLive(this.uniqueID)
        listenForSuccessfulSocketConnection_Student();

    }
    render () {

        return (
            <div className="subheader">
            <div className="subheader_dynamic_portion_item"><Actions /></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentview: state.views.currentview,
        live: state.data.live,
    }
}

export default connect(mapStateToProps)(StudentSubheader);