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
    let token = localStorage.getItem("token")
    if (!!token) {
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
      let newProjects = [project[0], ...this.state.projects];
      console.log(project[0]);
      this.setState({projects: newProjects}, () => {
        return this.props.history.push(`/home/upcoming-projects/${project[0].id}`)
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
              return <ProjectCard project={project} upcomingShow user={this.props.user}/>
            }}
          />
          <Route path="/home/completed-projects/:id" render={(routerProps) => {
              let id = parseInt(routerProps.match.params.id);
              console.log(routerProps.match.params);
              console.log(id);
              let project = this.state.projects.find(project => project.id === id)
              return <ProjectCard project={project} completedShow />
            }}
          />
          <Route path="/home/upcoming-projects" render={(routerProps) => (
            <UpcomingProjects projects={this.upcomingProjects()} user={this.props.user}/>
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
