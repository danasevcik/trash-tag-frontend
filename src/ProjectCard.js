import React from 'react';
import { Link } from 'react-router-dom'

const ProjectCard = (props) => {

  const newDate = (date) => {
    const dateArr = date.split('-')
    dateArr.push(dateArr.shift())
    return dateArr.join('-')
  }

  return (
    <div>
      <h3>{props.project.name}</h3>
      <h5>Location: {props.project.location}</h5>
      <h5>Time: {props.project.time}</h5>
      <img className="img" alt="before clean up" src={props.project.start_image}/>
      <p>{props.project.story}</p>
      {props.upcoming ?
        (<div>
          <Link to={`/home/upcoming-projects/${props.project.id}`}>
            <button>Show</button>
          </Link>
          <button>Join</button>
        </div>)
        :
        <img className="img" alt="finished clean up" src={props.project.end_image}/>

      }

    </div>
  )
}


export default ProjectCard;

// <h5>Date: {newDate(props.project.date)}</h5>
