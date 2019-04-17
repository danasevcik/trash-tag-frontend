import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

  return (
    <div className="ui inverted segment">
      <div className="ui inverted pointing secondary menu">
        <Link to="/home" className="item">
          Home
        </Link>
        <Link to="/home/upcoming-projects" className="item">
        Upcoming Projects
        </Link>
        <Link to="/home/new-project" className="item">
        Create a Cleanup
        </Link>
        <div className="right menu">
        {!!localStorage.getItem("token") ? (
          <React.Fragment >
            <i aria-hidden="true" className="user circle outline big icon" style={{width: '25px'}}></i>
            <Link to="/my-profile" className="item">My Profile</Link>
            <Link to="/" onClick={props.logout} className="item">Logout</Link>
          </React.Fragment>)
          :
          (<React.Fragment>
            <Link to="/login" className="item">Login</Link>
            <Link to="/signup" className="item">Signup</Link>
          </React.Fragment>)
          }
          </div>
      </div>
    </div>
  )


}


export default NavBar;
