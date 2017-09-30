import React, { Component } from 'react';
import { goLive, endLive } from '../../ducks/backend_reducer';
import { connect } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import TextField from 'material-ui/TextField';

class InstructorHeader extends Component {

    copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");

        //
        // *** This styling is an extra step which is likely not required. ***
        //
        // Why is it here? To ensure:
        // 1. the element is able to have focus and selection.
        // 2. if element was to flash render it has minimal visual impact.
        // 3. less flakyness with selection and copying which **might** occur if
        //    the textarea element is not visible.
        //
        // The likelihood is the element won't even render, not even a flash,
        // so some of these are just precautions. However in IE the element
        // is visible whilst the popup box asking the user for permission for
        // the web page to copy to the clipboard.
        //

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
        window.open(window.location.href)
    }

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
                    <div><button onClick={this.copyLink}>Copy URL</button></div>
                    <div>
                        <div className="header_dynamic_portion_content_end" onClick={this.props.endLive}>END</div>
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