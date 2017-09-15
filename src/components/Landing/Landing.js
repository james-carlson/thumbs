import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { generateRandomID, initializeUser } from '../../ducks/backend_reducer';


class Landing extends Component {
    componentDidMount() {
        this.props.initializeUser('instructor')
        this.props.generateRandomID()
    }

    render() {

        return (
            < div >
                <div className="App-header">
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Thumbs: Instant, Accurate Feedback</h2>
                    </div>
                    <div>To get started, click <Link to={`/${this.props.class_sessionID}`}><button>here</button></Link> to open a class session as an {this.props.userType}.</div>
                    <div></div>
                </div>
                <p className="App-intro">
                    This is the background info.
                </p>
            </div >

        );
    }
}

function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        userType: state.data.userType
    }
}

export default connect(mapStateToProps, { generateRandomID, initializeUser })(Landing);