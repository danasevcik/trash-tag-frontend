import React from 'react';

class NewForm extends React.Component {

  state = {
    name: "",
    location: "",
    date: "",
    story: "",
    start_image: "",
    completed: false,
    time: ""
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.submitHandler(this.state)
    this.setState({
      name: "",
      location: "",
      date: "",
      story: "",
      start_image: "",
      time: ""
    })
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={this.state.name}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="location"
          placeholder="Project Location"
          value={this.state.location}
          onChange={this.changeHandler}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={this.state.date}
          onChange={this.changeHandler}
        />
        <input
          type="textarea"
          name="story"
          placeholder="Why do you want to clean up this area?"
          value={this.state.story}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="start_image"
          placeholder="Before Photo"
          value={this.state.start_image}
          onChange={this.changeHandler}
        />
        <input
          type="time"
          name="time"
          placeholder="What time does your cleanup start?"
          value={this.state.time}
          onChange={this.changeHandler}
        />
        <button>Create Cleanup!</button>
      </form>
    );
  }


}

export default NewForm;
