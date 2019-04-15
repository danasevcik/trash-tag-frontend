import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Error from './Error';

class App extends Component {

  state = {
    user: {}
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    console.log("app did mount", token);
    fetch("http://localhost:3000/get_user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ user: data.user })
    });
  }

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
      .then(data => {
        this.setState({ user: data.user});
        localStorage.setItem("token", data.token);
      })
  };


  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route
            path="/home"
            render={routerProps => (
              <Home user={this.state.user}/>
            )}/>
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
