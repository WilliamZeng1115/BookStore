import React, { Component, Fragment } from 'react';

export class Filter extends Component {
  render() {
    return (
      <Fragment>
        <div className="sidenav">
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>
      </Fragment>
    )
  }
}

export default Filter;
