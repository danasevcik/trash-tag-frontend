import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Error from './Error';

class App extends Component {

  createUser = userInfo => {
    console.log('create user', userInfo);
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        user: { username: userInfo.username, password: userInfo.password }
      })
    })
      .then(resp => resp.json())
      .then(data => console.log);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/home" component={Home}/>
          <Route
            path="/signup"
            render={() => <Signup submitHandler={this.createUser} />}
          />
          <Route path="/login" component={Login}/>
          <Route path="/" component={Error}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
