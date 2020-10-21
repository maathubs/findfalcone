import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'

class Success extends Component {
  render() { 
    return (
      <div className="home">
      <div><h2>Finding Falcone...</h2></div>
      {this.props.location && this.props.location.query && this.props.location.query.responceData&&this.props.location.query.responceData.planet_name?
      <Fragment>
        <div><p>Success! Congratulations on Finding Falcone. King Shan is mighty Pleased'</p></div>
        <div><p>Planet found:{this.props.location.query.responceData.planet_name}</p></div>
      </Fragment>:
      <Fragment>
        <div><p>Sorry! you could not find Falcone</p></div>
        <div><p>Try again</p></div>
      </Fragment>
      }
      <div><p><button >
          <Link className="startAgain" to={{pathname:"/home"}}  >Start Again</Link></button></p>  
      </div>
      </div>
    );
  }
}

export default Success;