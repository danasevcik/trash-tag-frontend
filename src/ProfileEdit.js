import React from 'react';

class ProfileEdit extends React.Component {

  state = {
    name: "",
    picture: "",
    hometown: "",
    current_city: "",
    age: "",
    bio: ""
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
//PATCH request to /users/id but id is hidden, only have username for ~Saaafety~
    this.setState({
      name: "",
      picture: "",
      hometown: "",
      current_city: "",
      age: "",
      bio: ""
    })
    this.props.submitHandler()
  }


  render() {
    console.log(this.props.user.id)
    return (
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="picture"
          placeholder="Profile Photo"
          value={this.state.picture}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="hometown"
          placeholder="Hometown"
          value={this.state.hometown}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="current_city"
          placeholder="Current City"
          value={this.state.current_city}
          onChange={this.changeHandler}
        />
        <input
          type="number"
          name="age"
          placeholder="How old are you?"
          value={this.state.age}
          onChange={this.changeHandler}
        />
        <input
          type="textarea"
          name="bio"
          placeholder="Bio"
          value={this.state.bio}
          onChange={this.changeHandler}
        />
        <button>Save these changes</button>
      </form>
    )
  }


}

export default ProfileEdit;
