// eslint-disable-next-line
import React, { Component } from "react";
import SetProfile from "./SetupProfile";
import Profile from "./Profile";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  // constructor() {
  //   super();
  //   //initial state
  // }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* On Boot */}
            <Route path="/" exact component={Profile} />
            {/* Other Site */}
            <Route path="/setProfile" component={SetProfile} />
            {/* Error Case */}
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
