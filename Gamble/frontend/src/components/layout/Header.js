import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/api/auth'

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <button onClick={this.props.logoutUser} className="nav-link btn"> Logout </button>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
      </ul>
    );

    const unAuthLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          { isAuthenticated ? authLinks : unAuthLinks }
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);
