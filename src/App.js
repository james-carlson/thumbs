import React, { Component } from 'react';
// import { Socket } from 'react-socket-io';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Classroom from './components/Classroom/Classroom';
import './App.css';
import { connect } from 'react-redux';
import { generateRandomID } from './ducks/backend_reducer';
// import SocketContext from 'react-socket-context';



// const uri = 'http://localhost/test'
// const options = { transports: ['websocket']};

class App extends Component {


  render() {
    return (
      // <SocketContext>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path={`/${this.props.class_sessionID}`} component={Classroom} />
          </Switch>
        </Router>
      </div>
      // </SocketContext>
    );
  }
}

function mapStateToProps(state) {
  return {
    class_sessionID: state.data.class_sessionID
  }
}

export default connect(mapStateToProps, { generateRandomID })(App);