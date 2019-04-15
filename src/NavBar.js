import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

  return (
    <div>
      <Link to="/home">
        Home
      </Link>
      <Link to="/signup">
        Signup
      </Link>
      {!!localStorage.getItem("token") ? (
        <span>
          <Link to="/" onClick={props.logout}>Logout</Link>
          <Link to="/my-profile">My Profile</Link>
        </span>)
        :
        (<Link to="/login">Login</Link>)}
      <Link to="/home/upcoming-projects">
        Upcoming Projects
      </Link>
      <Link to="/home/new-project">
      Create a Cleanup
      </Link>
    </div>
  )


}


export default NavBar;
