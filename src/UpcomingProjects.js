import React from 'react';
import ProjectCard from './ProjectCard'

const UpcomingProjects = (props) => {

  let projects = props.projects.map(project => {
    return <ProjectCard key={project.id} project={project} upcoming user={props.user}/>
  })

  return (
    <div>
      <h1>UpcomingProjects go here</h1>
      {projects}
    </div>
  )


}


export default UpcomingProjects;
