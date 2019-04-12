import React from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
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
      console.log(this.props.history);
      let newProjects = [project, ...this.state.projects];
      this.setState({projects: newProjects}, () => {
        return this.props.history.push(`/home/upcoming-projects/${project.id}`)
      });
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/home/upcoming-projects/:id" render={(routerProps) => {
              let id = parseInt(routerProps.match.params.id);
              let project = this.state.projects.find(project => project.id === id)
              return <ProjectCard project={project}/>
            }}
          />
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


export default withRouter(Home);
