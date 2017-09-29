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
                        <div className="instructions">To get started, click above and open a class session as an instructor.</div>
                        </div>
                    </div>
                </Link>
                <div className="App-intro">
                    <span className="welcome_header">Welcome to Thumbs.</span>
                    <p>Respond anonymously to teacher.</p>
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
