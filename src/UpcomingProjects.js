import React from 'react';
import ProjectCard from './ProjectCard'

const UpcomingProjects = (props) => {

  let projects = props.projects.map(project => {
    return <ProjectCard key={project.id} project={project} upcoming user={props.user} updateProject={props.updateProject} completeProject={props.completeProject}/>
  })

  return (
      <div className="ui center aligned container">
        <h1 style={{fontSize: "50px"}}>Upcoming Projects</h1>
        {projects}
      </div>
  )


}


export default UpcomingProjects;
