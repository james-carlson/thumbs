import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../Actions/Actions';
import List from '../List/List';



class StudentSubheader extends Component {
    render () {
        const style = {
            margin: 12,
        };

        return (
            <div className="subheader">
            <div className="subheader_dynamic_portion_item"><Actions /></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentview: state.views.currentview,
        live: state.data.live,
    }
}

export default connect(mapStateToProps)(StudentSubheader);