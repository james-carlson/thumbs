import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goLive } from '../../ducks/backend_reducer';
// import InstructorHeader from './Instructor/InstructorHeader';
// import InstructorSubheader from '../Subheader/SessionInfo/Instructor/Subheader';
// import StudentHeader from './Student/StudentHeader';
// import StudentSubheader from '../Subheader/SessionInfo/StudentSubheader/Subheader';

class SessionInfo extends Component {
    render() {
        // var dynamicPortion;
        if (this.props.userType === 'instructor') {
            // headerComponent = <InstructorHeader />;
            // subheaderComponent = <InstructorSubheader />;

        } else {
            // headerComponent = <StudentHeader />;
            // subheaderComponent = <StudentSubheader />;
        }

        return (
            <div className="dynamic_portion_container">
                <div className="subheader_view">
                <div className="header_view">    
                {/* {dynamicPortion} */}
                </div>
                </div>
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

export default connect(mapStateToProps, { goLive })(SessionInfo);