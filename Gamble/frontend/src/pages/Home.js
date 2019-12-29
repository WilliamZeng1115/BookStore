import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Home extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
  const { isAuthenticated } = this.props.auth;
    const homeContents = isAuthenticated
    ? (
      <span id="join">
        <div> On SALE !!! </div>
      </span>
      )
    : (
      <span id="join">
        <Link to="/Register" className="nav-item nav-link">Join Now</Link>
      </span>
    );

    return (
      <Fragment>
        <div id="home">
          {homeContents}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(Home);
