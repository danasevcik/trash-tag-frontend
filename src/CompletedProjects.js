import React from 'react';
import ProjectCard from './ProjectCard'

const CompletedProjects = (props) => {

  let projects = props.projects.map(project => {
    return <ProjectCard key={project.id} project={project}/>
  })

  return (
    <div>
      <h1>CompletedProjects go here</h1>
      {projects}
    </div>
  )


}


export default CompletedProjects;
