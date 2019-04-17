import React from 'react';
import { Link, withRouter } from 'react-router-dom'
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
    <div className="ui center aligned container">
      <div className="ui centered card" style={{opacity: '0.75', marginBottom: "20px", backgroundColor:'white'}}>
        <div className="content">
          <h3 style={{fontSize: "50px"}}>{props.project.name}</h3>
          <h5 >Location: {props.project.location}</h5>
          <h5>Date: {newDate(props.project.date)}</h5>
          <h5>Time: {props.project.time}</h5>
          <p>{props.project.story}</p>
          <img className="img" alt="before clean up" src={props.project.start_image} className="ui image"/>
          {(volunteer(props) && (props.upcoming || props.upcomingShow)) ?
            (<div>
              <p>Volunteers: {getVolunteers(props.project)}</p>
              <Link to={`/home/upcoming-projects/${props.project.id}/edit`}>
                <button project={props.project} completeProject={props.completeProject} className="ui black fluid basic button">Complete Project</button>
              </Link>
            </div>)
            :
            null
          }
          {props.upcoming &&
            (<div>
              <Link to={`/home/upcoming-projects/${props.project.id}`}>
                <button className="ui black fluid basic button">Show</button>
              </Link>
            </div>)
          }
          {props.upcomingShow &&
            (<div>
              <p>Volunteers: {getVolunteers(props.project)}</p>
              <button onClick={(e) => joinProject(props.project.id)} className="ui black fluid basic button">Join</button>
            </div>)
          }
          {props.completed &&
            (<div>
              <img className="img" alt="finished clean up" src={props.project.end_image} className="ui image"/>
              <Link to={`/home/completed-projects/${props.project.id}`}>
                <button className="ui black fluid basic button">Show</button>
              </Link>
            </div>)
          }
          {props.completedShow &&
            (<div>
              <img className="img" alt="finished clean up" src={props.project.end_image}/>
              <p>Volunteers: {getVolunteers(props.project)}</p>
            </div>)}
        </div>
      </div>
    </div>
    )

}


export default withRouter(ProjectCard);
