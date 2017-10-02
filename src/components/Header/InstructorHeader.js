import React, { Component } from 'react';
import { goLive, endLive } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import TextField from 'material-ui/TextField';

class InstructorHeader extends Component {

    copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");

        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }

    copyLink = () => {
        this.copyTextToClipboard(window.location.href);
        // window.open(window.location.href)
    }

    displayLiveController(props) {
        if (this.props.live === true) {
            return (
                <div className="">
                    <div className="header_dynamic_portion_content_live">
                        <div className="header_dynamic_portion_content" id="medium_space" onClick={this.copyLink}>
                            {/* <button> */}
                            <svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 14 16" width="20"><path fillRule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z">
                            </path>
                            </svg>
                            {/* </button> */}
                        </div>
                        <div className="live_indicator"></div><div className="header_dynamic_portion_content" id="small_space"> LIVE!</div>
                        <div className="header_dynamic_portion_content" onClick={this.props.endLive}><button>END</button></div>
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
            <div>
                {this.displayLiveController()}
            </div>
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

export default connect(mapStateToProps, { goLive, endLive })(InstructorHeader);