import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { generateRandomID, initializeUser, resetData } from '../../ducks/backend_reducer';


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
                        <div className="landing_instructions">To get started, click above and open a class session as an instructor.</div>
                    </div>
                </Link>
                <div className="landing_main">
                    <span className="welcome_header">Welcome to Thumbs.</span>
                    <div className="welcome_content">
                        <p><b>What is Thumbs?</b><br />
                            Thumbs lets you know what students (or others) are <i>really</i> thinking, in real-time.</p>
                        <p><b>How does it work?</b><br />
                            Click on the logo above, and fill out the information about your session of Thumbs. Then click "Go Live", send the URL out, and people will be able to connect to your session. You'll be able to send questions and see responses in real-time.</p>
                    </div>
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
