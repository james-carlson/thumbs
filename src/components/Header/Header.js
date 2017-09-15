import React, { Component } from 'react';
import './Header.css';
import logo from './dmlogo.png';
import InstructorHeader from './Instructor/InstructorHeader';
import StudentHeader from './Student/StudentHeader';
import Subheader from '../Subheader/Subheader';
import { Link } from 'react-router-dom';
import { goLive } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';


class Header extends Component {
    render() {
        var headerStuffing;
        if (this.props.userType === 'instructor') {
            headerStuffing = <InstructorHeader />
        } else {
            headerStuffing = <StudentHeader />
        }

        return (

            <div>
                <div className="header">
                    <div><img className="logo" src={logo} alt="DevMountain logo" /></div>
                    <div>Thumbs</div>
                    <div><Link to="/">Home</Link></div>
                    <div className="instructor">{headerStuffing}</div>
                </div>
                <Subheader />
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