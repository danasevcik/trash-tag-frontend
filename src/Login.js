import React from 'react';

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.submitHandler(this.state);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div class="ui inverted segment">
        <form onSubmit={this.submitHandler} class="ui inverted form">
          <div class="equal width fields">
            <div class="field">
              <div class="ui fluid input">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                  />
              </div>
            </div>
            <div class="field">
              <div class="ui fluid input">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  />
              </div>
            </div>
          </div>
        <button class="ui fluid button">Login</button>
        </form>
      </div>
    )
  }


}


export default Login;
