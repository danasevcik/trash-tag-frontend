import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Error from './Error';
import ProfilePage from './ProfilePage';

class App extends Component {

  state = {
    user: {}
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!!token) {
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
    } else {
      return <Redirect to="/home" />
    }
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

  findUser = userInfo => {
    console.log('in find user');
    fetch("http://localhost:3000/login", {
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
      this.props.history.push('/home/upcoming-projects')
    })
  }

  logout = () => {
    console.log('clicked');
    localStorage.removeItem("token")
    this.setState({user: {}})
    return <Redirect to='/xyz'/>
  }


  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <NavBar user={this.state.user} logout={this.logout}/>
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
          <Route
            path="/login"
            render={() => <Login submitHandler={this.findUser} />}
          />
          <Route
            path="/my-profile"
            render={() => <ProfilePage user={this.state.user} />}
          />
          <Route path="/" component={Error}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
