import React from 'react';
import ProjectCard from './ProjectCard'

const CompletedProjects = (props) => {

  let projects = props.projects.map(project => {
    return <ProjectCard key={project.id} project={project} completed user={props.user}/>
  })

  return (
    <div className="ui center aligned container">
      <h1 style={{fontSize: "50px"}}>Completed Projects</h1>
      {projects}
    </div>
  )


}


export default CompletedProjects;
