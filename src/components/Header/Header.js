import React, { Component } from 'react';
import './Header.css';
import logo from './dmlogo.png';
// import Subheader from '../Subheader/Subheader';
import { Link } from 'react-router-dom';
import { goLive } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
import InstructorHeader from './InstructorHeader';
import StudentHeader from './StudentHeader';
import resetData from '../../ducks/backend_reducer';


class Header extends Component {
    displayDynamicHeaderController() {
        return this.props.userIsInstructor ? <InstructorHeader /> : <StudentHeader />
        }

    handleReset(){
        resetData()
    }

    render() {

        return (
                <div className="header">
                    <div className="logo_container">
                        <div className="logo">
                            <Link to="/" className="logo" onClick={resetData}>
                            <img className="logo" src={logo} alt="DevMountain logo" />
                            <text className="appName">THUMBS</text>
                            </Link>
                        </div>
                    </div>
                    <div className="header_dynamic_portion_container">
                        {this.displayDynamicHeaderController()}
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
        userIsInstructor: state.data.userIsInstructor
    }
}

export default connect(mapStateToProps, { goLive })(Header);