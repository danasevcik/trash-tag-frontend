import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Error from './Error';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Error}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
