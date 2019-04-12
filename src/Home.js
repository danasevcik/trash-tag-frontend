import React from 'react';
import { Route, Switch } from "react-router-dom";
import CompletedProjects from './CompletedProjects'
import UpcomingProjects from './UpcomingProjects'
import NewForm from './NewForm'
import ProjectCard from './ProjectCard'

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
  upcomingProjects = () => {
    let upcomingProjects = this.state.projects.filter(project => {
      return project.completed === false
    })
    return upcomingProjects
  }

  submitHandler = (newProjectObj) => {
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newProjectObj)
    })
    .then(resp => resp.json())
    .then(project => {
      return <Route path={`/home/upcoming-projects/${project.id}`} render={(routerProps) => (
        <ProjectCard project={project}/>
      )}/>
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/home/upcoming-projects" render={(routerProps) => (
            <UpcomingProjects projects={this.upcomingProjects()}/>
          )}/>
          <Route path="/home/new-project" render={(routerProps) => (
            <NewForm submitHandler={this.submitHandler} />
          )}/>
          <Route path="/home" render={(routerProps) => (
            <CompletedProjects projects={this.completedProjects()} />
          )}/>
        </Switch>
      </div>

    )
  }

}


export default Home;
