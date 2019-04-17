import React from 'react';

class Error extends React.Component {
// <img class='error' src="https://www.graziame.com/sites/default/files/graziame/styles/1140_630_wide_landscape/public/images/2019/03/13/dustan-woodhouse-675082-unsplash.jpg?itok=cC7oDM6M" style={{height: "100%", width: '100%'}}/>
  render() {
    return (
      <div class='error'>
        <div class="ui grid">
          <div class="right floated seven wide column">
            <h1 style={{textAlign: 'center', margin: '0'}}>#TrashTagChallenge</h1>
            <p style={{padding: '0', margin: '0'}}>1. Find an area that you care about</p>
            <p style={{padding: '0', margin: '0'}}>2. Organize a cleanup</p>
            <p style={{padding: '0', margin: '0'}}>3. Post the finished photo</p>
            <p style={{padding: '0', margin: '0'}}>4. Don't forget to include #TrashTagChallenge!</p>
          </div>
        </div>
      </div>

    )

  }


}


export default Error;
