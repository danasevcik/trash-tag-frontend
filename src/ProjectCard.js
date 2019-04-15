import React from 'react';
import { Link, withRouter } from 'react-router-dom'

const ProjectCard = (props) => {

  const newDate = (date) => {
    const dateArr = date.split('-')
    dateArr.push(dateArr.shift())
    return dateArr.join('-')
  }

  const joinProject = (projectId) => {
    console.log(projectId);
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




    console.log(props.project);
  return (
    <div>
      <h3>{props.project.name}</h3>
      <h5>Location: {props.project.location}</h5>
      <h5>Time: {props.project.time}</h5>
      <h5>Volunteers:
        {
          props.project.volunteers.map(volunteer => (
            volunteer.id
          ))
        }
      </h5>
      <img className="img" alt="before clean up" src={props.project.start_image}/>
      <p>{props.project.story}</p>
      {props.upcoming ?
        (<div>
          <Link to={`/home/upcoming-projects/${props.project.id}`}>
            <button>Show</button>
          </Link>
          <button onClick={(e) => joinProject(props.project.id)}>Join</button>
        </div>)
        :
        <img className="img" alt="finished clean up" src={props.project.end_image}/>

      }

    </div>
  )
}


export default withRouter(ProjectCard);

// <h5>Date: {newDate(props.project.date)}</h5>
