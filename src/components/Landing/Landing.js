import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { generateRandomID, initializeUser, resetData } from '../../ducks/backend_reducer';
import thumbs from './thumbs.svg';
import {listenForSuccessfulSocketConnection, emitJoinRoom} from '../../services/handle_sockets';


class Landing extends Component {
    
    componentWillMount() {
        this.props.generateRandomID();
        // this.props.initializeUser('instructor');
    }
    
    handleInitializeUser(props) {
        this.props.initializeUser();
    }
    
    handleSocketListener(props) {
        if (props.class_sessionID !== null) {
            
        }
    }
    
    render() {
        return (
            <div>
                {/* {listenForSuccessfulSocketConnection('instructor', this.props.class_sessionID)} */}
                <Link to={`/${this.props.class_sessionID}`} onClick={this.handleInitializeUser()}>
                    <div className="landing_header">
                        <div className="landing_logo">
                            <div className="landing_overlay">
                                <div className="landing_appName">THUMBS</div>
                                <div className="tagline">Instant,</div>
                                <div className="tagline">Accurate</div>
                                <div className="tagline">Feedback</div>
                            </div>
                        </div>
                        <div>
                            {/* <img src={thumbs} alt="logo" className="thumb" /> */}
                        </div>
                    </div>
                    <div>To get started, click above and open a class session as an instructor.</div>
                </Link>
                    <div className="App-intro">
                        <h1>Welcome to Thumbs.</h1>
                        <p>This is the background info.</p>
                        <p>Here's how you use Thumbs.</p>
                        <p>Blah, blah, blah.</p>
                </div>
            </div>


        );
    }

}

function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        userIsInstructor: state.data.userIsInstructor
    }
}

export default connect(mapStateToProps, { generateRandomID, initializeUser, resetData })(Landing);
