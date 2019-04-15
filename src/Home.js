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
    console.log("in home cDM", this.props.user.username);
    if (this.props.user.username) {
      let token = localStorage.getItem("token")
      console.log(token);
      fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
          Authorization: `${token}`
      }
     })
      .then(resp => resp.json())
      .then(projects => (
        this.setState({ projects }, console.log)
      ))} else {
        this.props.history.push('/signup')
      }
  }

  completedProjects = () => {
    console.log(this.state.projects)
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
    let token = localStorage.getItem("token");
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `${token}`
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
