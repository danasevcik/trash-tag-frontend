import React from 'react';
import { Route, Switch } from "react-router-dom";
import CompletedProjects from './CompletedProjects'
import UpcomingProjects from './UpcomingProjects'

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

  render() {
    console.log(this.upcomingProjects())
    return (
      <div>
        <Switch>
          <Route path="/home/upcoming-projects" render={(routerProps) => (
            <UpcomingProjects projects={this.upcomingProjects()}/>
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
