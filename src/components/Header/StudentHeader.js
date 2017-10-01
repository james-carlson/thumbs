import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { goLive, getLive, endLive } from '../../ducks/backend_reducer';


class StudentHeader extends Component {

    componentWillMount(props) {
        var pathName = (this.props.location.pathname);
        this.uniqueID = (pathName[0] === '/') ? pathName.substring(1) : pathName
        console.log(this.uniqueID);
    }

    componentDidMount() {
        this.props.getLive(this.uniqueID)
    }

    render() {
        return (
            <div className="header_student_dynamic_portion_content">
                <div className="student_header">
                    {/* <div><b>Instructor:</b></div>
                    <div id="medium_space">{this.props.instructorName}</div>
                    <div><b>Topic:</b></div>
                    <div>{this.props.classTopic}</div> */}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        userType: state.data.userType,
        live: state.data.live,
        instructorName: state.data.instructorName,
        classTopic: state.data.classTopic
    }
}

export default withRouter(connect(mapStateToProps, { goLive, endLive, getLive })(StudentHeader));