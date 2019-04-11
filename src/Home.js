import React from 'react';
import CompletedProjects from './CompletedProjects'

class Home extends React.Component {

  state={
    projects:[]
  }

  componentDidMount() {
    fetch('http://localhost:3000/projects')
    .then(resp => resp.json())
    .then(projects => (
      this.setState({ projects })
    ))
  }

  completedProjects = () => {
    let completedProjects = this.state.projects.filter(project => {
      return project.completed
    })
    return completedProjects
  }

  // ongoingProjects

  render() {
    return (
      <div>
        <h1>Home goes here</h1>
        <CompletedProjects projects={this.completedProjects()} />
      </div>

    )
  }

}


export default Home;
