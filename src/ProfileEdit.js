import React from 'react';
import {Redirect, Route} from 'react-router-dom';

class ProfileEdit extends React.Component {

  state = {
    name: this.props.user.name || '',
    picture: this.props.user.picture || '',
    hometown: this.props.user.hometown || '',
    current_city: this.props.user.current_city || '',
    age: this.props.user.age || '',
    bio: this.props.user.bio || ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let token = localStorage.getItem("token");
    let userId = parseInt(this.props.user.user_id)
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `${token}`
      },
      body: JSON.stringify({
        user: { name: this.state.name, picture: this.state.picture, hometown: this.state.hometown, current_city: this.state.current_city, age: this.state.age, bio: this.state.bio }
      })
    })
    .then(resp => resp.json())
    .then(resp => this.props.updateUser(resp))
    .then(this.props.submitHandler())
  }


  render() {
    return (
      <div className="ui inverted segment" style={{padding: '15px', margin: '10px'}}>
        <form onSubmit={this.submitHandler} className="ui centered form">
          <div className="equal width fields">
            <div className="field">
              <div className="ui input">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui input">
                <input
                  type="text"
                  name="picture"
                  placeholder="Profile Photo"
                  value={this.state.picture}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div  className="field">
              <div className="ui input">
                <input
                  type="text"
                  name="hometown"
                  placeholder="Hometown"
                  value={this.state.hometown}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="equal width fields">
            <div className="field">
              <div className="ui input">
                <input
                  type="text"
                  name="current_city"
                  placeholder="Current City"
                  value={this.state.current_city}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui input">
                <input
                  type="number"
                  name="age"
                  placeholder="How old are you?"
                  value={this.state.age}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui input">
                <input
                  type="textarea"
                  name="bio"
                  placeholder="Bio"
                  value={this.state.bio}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
          </div>
          <button className="ui fluid button">Save These Changes</button>
        </form>
      </div>
    )
  }


}

export default ProfileEdit;
