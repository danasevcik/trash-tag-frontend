import React from 'react';
import ProjectCard from './ProjectCard'

const CompletedProjects = (props) => {

  let projects = props.projects.map(project => {
    return <ProjectCard key={project.id} project={project} completed user={props.user}/>
  })

  return (
    <div>
      <h1>Completed Projects</h1>
      {projects}
    </div>
  )


}


export default CompletedProjects;
