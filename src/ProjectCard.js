import React from 'react';
import { Link, withRouter } from 'react-router-dom'

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

    const volunteer = () => {
      console.log(props.user)
      let volunteer = props.project.volunteers.find( v => {
        return v.user_id === props.user.user_id
      })
      admin(volunteer)
    }

    const admin = (volunteer) => {
      return volunteer.admin
    }

// volunteer()
  return (
    <div>
      <h3>{props.project.name}</h3>
      <h5>Location: {props.project.location}</h5>
      <h5>Date: {newDate(props.project.date)}</h5>
      <h5>Time: {props.project.time}</h5>
      <img className="img" alt="before clean up" src={props.project.start_image}/>
      {(props.project.completed === false && volunteer()) ?
        (<div>
          <Link to={`/home/upcoming-projects/${props.project.id}`}>
            <button></button>
          </Link>
        </div>)
        :
        null
      }
      <p>{props.project.story}</p>
      <p>Volunteers: {getVolunteers(props.project)}</p>
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
