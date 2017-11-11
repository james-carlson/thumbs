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
                            <div className="landing_instructions top_padding">To get started, click anywhere.</div>
                        </div>
                        <div className="landing_main">
                            <div className="welcome_content">
                                {/* <h1 className="welcome_header">Welcome to Thumbs!</h1> */}
                                <p><b>What is Thumbs?</b><br />
                                    Thumbs lets you know what students (or others) are <i>really</i> thinking, in real-time.</p>
                                <p><b>How does it work?</b><br />
                                    Click anywhere on this page to get started.
                            Fill out the information about your session of Thumbs.
                            Then click "Go Live", send the URL out (you can click on the clipboard to grab the URL),
                            and anyone visiting your link will be able to see your session.
                            You'll be able to send questions and see responses in real-time.</p>
                                <p><b>Note</b><br />
                                    The initial version of Thumbs was personalized for DevMountain.
                            If you would like to use Thumbs in your organization, <a href="https://www.linkedin.com/in/james-d-carlson/">get in touch</a>!</p>
                            </div>
                        </div>
                </Link>
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
