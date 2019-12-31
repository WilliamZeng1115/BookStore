import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

import { logoutUser } from '../../actions/api/auth'

export class Header extends Component {
  state = {
    search: '',
    enterPressed:false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  }

  searchBooks = e => {
    if(e.key === 'Enter') {
      this.setState({
        enterPressed: true
      });
    }
  }

  onChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  render() {
    const { search, enterPressed } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    if(enterPressed) {
      this.state.enterPressed = false;
      return <Redirect to={{
            pathname: '/SearchResult',
            state: { search: search }
        }}/>
    }

    const authLinksRight = (
      <Fragment>
        <Badge badgeContent={10} color="secondary" className="nav-link">
          <MailIcon color="secondary" className="menuBar-icon"/>
        </Badge>
        <Badge badgeContent={10} color="secondary" className="nav-link">
          <ShoppingCartOutlinedIcon color="secondary" className="menuBar-icon"/>
        </Badge>
        <div className="nav-link"><AccountCircle color="secondary" className="menuBar-icon"/></div>
        <Button color="secondary" variant="contained" onClick={this.props.logoutUser}  className="nav-link btn">Logout</Button>
      </Fragment>
    );

    const unAuthLinksRight = (
      <Fragment>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </Fragment>
    );

    const rightMenuItems = isAuthenticated ? authLinksRight : unAuthLinksRight;

    const authLinksLeft = (
      <Fragment>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/about" className="nav-link">Browse</Link>
      </Fragment>
    );

    const unAuthLinksLeft = (
      <Fragment>
        <Link to="/about" className="nav-link">About</Link>
      </Fragment>
    );

    const leftMenuItems = isAuthenticated ? authLinksLeft : unAuthLinksLeft;

    return (
      <Fragment>
        <nav className="navbar bg-black sticky-top navbarColor" style={ { height: "56px" } }>
          <div className="nav left" id="nav-tab" role="tablist">
            <Link key="home" value="icon" to="/" id="icon">ReBookz</Link>
            <div className="divider"/>
            { leftMenuItems }
          </div>
          <div className="form-inline has-search center">
            <SearchOutlinedIcon className="btn fa fa-search form-control-feedback navbar-search-icon" />
            <input className="form-control mr-sm-2 navbar-search" name="search" type="search" placeholder="Search..." value={search} aria-label="Search" onChange={this.onChange} onKeyDown={this.searchBooks.bind(this)}/>
          </div>
          <div className="nav right" id="nav-tab" role="tablist">
            { rightMenuItems }
          </div>
        </nav>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));
