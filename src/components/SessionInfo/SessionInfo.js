import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goLive } from '../../ducks/backend_reducer';

class SessionInfo extends Component {
    render() {
        if (this.props.userType === 'instructor') {


        return (
            <div className="dynamic_portion_container">
                <div className="subheader_view">
                <div className="header_view">    

                </div>
                </div>
            </div>
        );
    }


function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        userType: state.data.userType
    }
}

export default connect(mapStateToProps, { goLive })(SessionInfo);