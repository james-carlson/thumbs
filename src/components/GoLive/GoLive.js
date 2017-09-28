import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goLive } from '../../ducks/backend_reducer';
import { emitJoinRoom } from '../../services/handle_sockets';


class GoLive extends Component {
    constructor(props){
        super(props);

        this.displayStatus = this.displayStatus.bind(this);
    }

    handleGoLive(props) {
        let userType = this.props.userIsInstructor ? "instructor" : "student"
        console.log("about to emitJoinRoom with userType", userType, "and sessionID/room#: ", this.props.class_sessionID);
        emitJoinRoom("instructor", this.props.class_sessionID)
        this.props.goLive(this.props.class_sessionID, this.props.instructorName, this.props.classTopic);
    }

    displayStatus(props) {
        if (this.props.live === true) {
            return <button onClick={() => this.props.endLive()}> END </button>
        } else {
            return <button onClick={() => this.handleGoLive()}>GO LIVE</button>
        }
    }


    render () {

        return (
            <div className="subheader_dynamic_portion_item">
            {this.displayStatus()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        live: state.data.live,
        class_sessionID: state.data.class_sessionID,
        classTopic: state.data.classTopic,
        instructorName: state.data.instructorName,
        userIsInstructor: state.sockets.userIsInstructor
    }
}

export default connect(mapStateToProps, { goLive })(GoLive);