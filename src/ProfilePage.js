import React from 'react'
import ProfileEdit from './ProfileEdit'
import { Route } from 'react-router-dom'

class ProfilePage extends React.Component {

  state = {
    clicked: false
  }

  clickHandler = () => {
    this.setState({clicked: !this.state.clicked})
  }

  render()
    {return (
      <div>
        <h1>{this.props.user.username}</h1>
        {this.props.user.picture ? <img alt="" src={this.props.user.picture}/> : <img alt="" src="https://proud2bgreen.files.wordpress.com/2010/10/recycle20arrowswglobe20guy.jpg" style={{height: '100px', width: '100px'}}/>}
        {this.props.user.name && <h3>Name: {this.props.user.name}</h3>}
        {this.props.user.hometown && <h3>Hometown: {this.props.user.hometown}</h3>}
        {this.props.user.current_city && <h3>Current City: {this.props.user.current_city}</h3>}
        {this.props.user.age && <h3>Age: {this.props.user.age}</h3>}
        {this.props.user.bio && <p>Bio: {this.props.user.bio}</p>}
        <button onClick={this.clickHandler}>Edit Profile</button>
        {this.state.clicked ? <ProfileEdit user={this.props.user} submitHandler={this.clickHandler}/> : null}
      </div>
    )}


}
export default ProfilePage;
