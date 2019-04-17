import React from 'react'

class ProjectEdit extends React.Component {

  state = {
    end_image: "",
    completed: true
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let token = localStorage.getItem("token");
    let projectId = parseInt(this.props.project.id)
    fetch(`http://localhost:3000/projects/${projectId}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `${token}`
      },
      body: JSON.stringify({
        project: { end_image: this.state.end_image, completed: this.state.completed }
      })
    })
    .then(resp => resp.json())
    .then(resp => this.props.completeProject(resp))
  }


  render() {
    return (
      <div>
      <h2>{this.props.project.name}</h2>
      <img src={this.props.project.start_image} alt="before cleanup" style={{height: '100px', width: '100px'}}/>
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          name="end_image"
          placeholder="Completed Image"
          value={this.state.end_image}
          onChange={this.changeHandler}
        />
      <button className="ui black fluid basic button">Complete Project</button>
      </form>
      </div>
    )
  }


}


export default ProjectEdit
