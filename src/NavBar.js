import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

const NavBar = (props) => {

  return (
    <div class="ui inverted segment">
      <div class="ui inverted pointing secondary menu">
        <Link to="/home" class="item">
          Home
        </Link>
        <Link to="/home/upcoming-projects" class="item">
        Upcoming Projects
        </Link>
        <Link to="/home/new-project" class="item">
        Create a Cleanup
        </Link>
        <div class="right menu">
        {!!localStorage.getItem("token") ? (
          <React.Fragment >
            <i aria-hidden="true" class="user circle outline big icon" style={{width: '25px'}}></i>
            <Link to="/my-profile" class="item">My Profile</Link>
            <Link to="/" onClick={props.logout} class="item">Logout</Link>
          </React.Fragment>)
          :
          (<React.Fragment>
            <Link to="/login" class="item">Login</Link>
            <Link to="/signup" class="item">Signup</Link>
          </React.Fragment>)
          }
          </div>
      </div>
    </div>
  )


}


export default NavBar;
