import React from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import CompletedProjects from './CompletedProjects'
import UpcomingProjects from './UpcomingProjects'
import NewForm from './NewForm'
import ProjectCard from './ProjectCard'
import ProjectEdit from './ProjectEdit'

class Home extends React.Component {

  state={
    projects:[]
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    if (!!token) {
      fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
          Authorization: `${token}`
      }
     })
      .then(resp => resp.json())
      .then(projects => (
        this.setState({ projects })
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
      let newProjects = [project[0], ...this.state.projects];
      this.setState({projects: newProjects}, () => {
        return this.props.history.push(`/home/upcoming-projects/${project[0].id}`)
      });
    })
  }

  updateProject = (volunteer) => {
    let newProjects = [...this.state.projects]
    let wantedProject = newProjects.find(project => {
      return project.id === volunteer.project_id
    })
    wantedProject.volunteers.push(volunteer)
  }

  completeProject = (projectObj) => {
    let newProjects = [projectObj, ...this.state.projects]
    this.setState({projects: newProjects}, this.props.history.push('/home'))
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/home/upcoming-projects/:id/edit" render={(routerProps) => {
              let id = parseInt(routerProps.match.params.id);
              let project = this.state.projects.find(project => project.id === id)
              return <ProjectEdit project={project} completeProject={this.completeProject}/>
            }}
            />
          <Route path="/home/upcoming-projects/:id" render={(routerProps) => {
              let id = parseInt(routerProps.match.params.id);
              let project = this.state.projects.find(project => project.id === id)
              return <ProjectCard project={project} upcomingShow user={this.props.user} updateProject={this.updateProject} completeProject={this.completeProject}/>
            }}
          />
          <Route path="/home/completed-projects/:id" render={(routerProps) => {
              let id = parseInt(routerProps.match.params.id);
              let project = this.state.projects.find(project => project.id === id)
              return <ProjectCard project={project} completedShow user={this.props.user}/>
            }}
          />
          <Route path="/home/upcoming-projects" render={(routerProps) => (
            <UpcomingProjects projects={this.upcomingProjects()} user={this.props.user} completeProject={this.completeProject}/>
          )}/>
          <Route path="/home/new-project" render={(routerProps) => (
            <NewForm submitHandler={this.submitHandler} />
          )}/>
          <Route path="/home" render={(routerProps) => (
            <CompletedProjects projects={this.completedProjects()} user={this.props.user}/>
          )}/>
        </Switch>
      </div>

    )
  }

}


export default withRouter(Home);
