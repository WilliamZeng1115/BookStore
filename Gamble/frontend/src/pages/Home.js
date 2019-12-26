import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <div id="home">
          <span id="join">
            <Link to="/Register" className="nav-item nav-link">Join Now</Link>
          </span>
        </div>
      </Fragment>
    )
  }
}

export default Home
