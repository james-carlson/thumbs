import React, { Component } from 'react';
import { goLive } from '../../../ducks/backend_reducer';
import { connect } from 'react-redux';

class InstructorHeader extends Component {
    render() {
        return (
            <div>
                <div>
                <input placeholder="Instructor's Name" /></div>
                <input placeholder="Lesson Topic" />
                <button onClick={() => this.props.goLive(this.props.class_sessionID)}>GO LIVE</button>
                <button> END </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        userType: state.data.userType
    }
}

export default connect(mapStateToProps, { goLive })(InstructorHeader);