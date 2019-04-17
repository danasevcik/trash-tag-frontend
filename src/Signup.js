import React from 'react';

class Signup extends React.Component {
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
      <div className="ui inverted segment">
        <form onSubmit={this.submitHandler} className="ui inverted form">
          <div className="equal width fields">
            <div className="field">
              <div className="ui fluid input">
                <input
                 type="text"
                 placeholder="username"
                 name="username"
                 value={this.state.username}
                 onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui fluid input">
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
          <button className="ui fluid button">Sign Up</button>
        </form>
      </div>
    )
  }


}


export default Signup;
