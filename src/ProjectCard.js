import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import ProjectEdit from './ProjectEdit'

const ProjectCard = (props) => {

  const newDate = (date) => {
    const dateArr = date.split('-')
    dateArr.push(dateArr.shift())
    return dateArr.join('-')
  }

  const joinProject = (projectId) => {
    let token = localStorage.getItem("token");
    fetch('http://localhost:3000/volunteers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `${token}`
      },
        body: JSON.stringify({project_id: parseInt(projectId), admin: false})
      })
      .then(resp => resp.json())
      .then(resp => props.updateProject(resp))
      .then(resp => (
        props.history.push(`/home/upcoming-projects/${projectId}`)
      ))
    }

    const getVolunteers = (project) => {
      let volunteers= project.volunteers.map( (v) => {
        return v.username ? v.username : "anonymous user"
      })
      return volunteers.join(", ")
    }

    // THIS WILL RETURN true or false (if the user is the admin or not)
    const volunteer = (props) => {
      let volunteer = props.project.volunteers.find( v => {
        return v.user_id === props.user.user_id
      })
      if (volunteer) {
        return admin(volunteer)
      }
    }
    const admin = (volunteer) => {
      if (!!volunteer.admin) {
        return !!volunteer.admin
      }
    }

  return (
    <div>
      <h3>{props.project.name}</h3>
      <h5>Location: {props.project.location}</h5>
      <h5>Date: {newDate(props.project.date)}</h5>
      <h5>Time: {props.project.time}</h5>
      <img className="img" alt="before clean up" src={props.project.start_image}/>
      <p>{props.project.story}</p>
      <p>Volunteers: {getVolunteers(props.project)}</p>
      {(volunteer(props) && (props.upcoming || props.upcomingShow)) ?
        (<div>
          <Link to={`/home/upcoming-projects/${props.project.id}/edit`}>
            <button project={props.project} completeProject={props.completeProject}>Complete Project</button>
          </Link>
        </div>)
        :
        null
      }
      {props.upcoming &&
        (<div>
          <Link to={`/home/upcoming-projects/${props.project.id}`}>
            <button>Show</button>
          </Link>
        </div>)
      }
      {props.upcomingShow &&
        (<div>
          <button onClick={(e) => joinProject(props.project.id)}>Join</button>
        </div>)
      }
      {props.completed &&
        (<div>
          <Link to={`/home/completed-projects/${props.project.id}`}>
            <button>Show</button>
          </Link>
          <img className="img" alt="finished clean up" src={props.project.end_image}/>
        </div>)
      }
      {props.completedShow && <img className="img" alt="finished clean up" src={props.project.end_image}/>}
    </div>
    )

}


export default withRouter(ProjectCard);
