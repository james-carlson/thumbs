import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goLive } from '../../ducks/backend_reducer';

class GoLive extends Component {
    constructor(props){
        super(props);

        this.displayStatus = this.displayStatus.bind(this);
    }

    displayStatus(props) {
        if (this.props.live === true) {
            return <button onClick={() => this.props.goLive(this.props.class_sessionID)}> END </button>
        } else {
            return <button onClick={() => this.props.goLive(this.props.class_sessionID)}>GO LIVE</button>
        }
    
    }


    render () {
        const display = {

        }

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
        class_sessionID: state.data.class_sessionID
    }
}

export default connect(mapStateToProps, { goLive })(GoLive);