import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { generateRandomID, initializeUser, resetData } from '../../ducks/backend_reducer';



class Landing extends Component {
    
    componentWillMount(){
        this.props.generateRandomID();
        // this.props.initializeUser('instructor');
    }

    handleInitializeUser() {
        this.props.initializeUser()
    }

    render() {
        return (
            < div >
                <div className="App-header">
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Thumbs: Instant, Accurate Feedback</h2>
                    </div>
                    <div></div>
                </div>
                <p className="App-intro">
                    This is the background info. 
                </p>
                {/* <div>To get started, click <Link to={`/${this.props.class_sessionID}`}><button onClick={initializeUser('instructor')}>here</button></Link> to open a class session as an {this.props.userType}.</div> */}
                <div>To get started, click <Link to={`/${this.props.class_sessionID}`}><button onClick={this.handleInitializeUser()}>here</button></Link> to open a class session as an instructor.</div>
            </div >

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