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
    console.log('in signup', this.state);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
           type="text"
           placeholder="username"
           name="username"
           value={this.state.username}
           onChange={this.changeHandler}
          />
          <input
           type="password"
           placeholder="password"
           name="password"
           value={this.state.password}
           onChange={this.changeHandler}
          />
          <button>Sign Up</button>
        </form>
      </div>
    )
  }


}


export default Signup;
