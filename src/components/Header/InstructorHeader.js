import React, { Component } from 'react';
import { goLive } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import TextField from 'material-ui/TextField';

class InstructorHeader extends Component {
    displayLiveController(props) {
        if (this.props.live === true) {
            return (
                <div className="header_dynamic_portion_content">
                    <div>
            <div className="header_dynamic_portion_content">Welcome, {this.props.instructorName}!</div>
            <div className="header_dynamic_portion_content">Topic: {this.props.classTopic}</div>
                </div>
                <div>
            <div className="header_dynamic_portion_content_live">
                <div><div className="live_indicator"></div></div>LIVE!</div>
            </div>
            <div>   
            <div className="header_dynamic_portion_content_end">END</div>
            </div>
            </div>
            )
        } else {
            return <div></div>
        }
    }

    displayInstructorInfoController(props) {
        
    }

    
    render() {
        return (
            <div className="">
                {this.displayLiveController()}
            </div>
            // <div className="dynamicPortion_container">
            //      <div className="dynamicPortion_item">
            //      <input placeholder={"What's your name, instructor?"} />


            //          {/* <MuiThemeProvider>
            //              <TextField
            //                  width="30%"
            //                  hintText="Instructor"
            //                  autoFocus="true"
            //                  floatingLabelStyle={{
            //                      height: '45px',
            //                      paddingTop: '0px',
            //                      margin: '0px'
            //                  }}
            //                  style={{
            //                      width: '100%',
            //                      margin: '0px',
            //                      border: '2px solid #25aae1;',
            //                      backgroundColor: '#fff',
            //                      fontSize: '.7rem',
            //                      lineHeight: '.7rem',
            //                  }}
            //                  underlineFocusStyle={{
            //                      color: '#25aae1',
            //                  }}
            //              />
            //          </MuiThemeProvider> */}
            //      </div>
            //      <div className="dynamicPortion_item">
            //      <input placeholder={"Today's class is about ..."} />
            //          {/* <MuiThemeProvider>
            //              <TextField
            //                  width="30%"
            //                  hintText=""
            //                  floatingLabelText="Today's class is about ..."
            //                  style={{
            //                      width: '100%',
            //                      margin: '0',
            //                      border: '2px solid #25aae1;',
            //                      backgroundColor: '#fff',
            //                  }}
            //              />
            //          </MuiThemeProvider> */}
            //      </div>
            //      <div className="dynamicPortion_item">
            //          <button onClick={() => this.props.goLive(this.props.class_sessionID)}>GO LIVE</button>
            //          <button> END </button>
            //      </div>
            //  </div>
            // </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        class_sessionID: state.data.class_sessionID,
        db_session_id: state.data.db_session_id,
        userType: state.data.userType,
        live: state.data.live,
        instructorName: state.data.instructorName,
        classTopic: state.data.classTopic
    }
}

export default connect(mapStateToProps, { goLive })(InstructorHeader);