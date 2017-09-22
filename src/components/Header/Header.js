import React, { Component } from 'react';
import './Header.css';
import logo from './dmlogo.png';
import Subheader from '../Subheader/Subheader';
import { Link } from 'react-router-dom';
import { goLive } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
import InstructorHeader from './InstructorHeader';
import StudentHeader from './StudentHeader';


class Header extends Component {
    displayDynamicHeaderController(props) {
        if (this.props.userType === 'instructor') {
            return(<InstructorHeader />);
        } else {
            return(<StudentHeader />);
        }

    }


    render() {

        return (
            <div className="nav_container">
                <div className="header">
                    <div className="logo_container">
                        <div className="logo">
                            <Link to="/" className="logo">
                            <img className="logo" src={logo} alt="DevMountain logo" />
                            <text className="appName">THUMBS</text>
                            </Link>
                        </div>
                    </div>
                    <div className="header_dynamic_portion_container">
                        {this.displayDynamicHeaderController()}
                        </div>
                </div>
                <div className="subheader">
                <Subheader />
                </div>
            </div>



        );
    }
}

function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        userType: state.data.userType
    }
}

export default connect(mapStateToProps, { goLive })(Header);