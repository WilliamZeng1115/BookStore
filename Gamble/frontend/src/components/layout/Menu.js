import React, { Component, Fragment} from 'react'
import { Link } from 'react-router-dom';
import { DropDownButton } from './Controls'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/api/auth'
import Badge from '@material-ui/core/Badge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import '../../main.css'

export class Menu extends Component {
  state = {
    search: ''
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  searchBooks = e => {
    if(e.key === 'Enter') {
      const { search } = this.state;
      console.log(search);
    }
  }

  onChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  render() {
    const { search } = this.state;
    const { isAuthenticated, isLoading, user } = this.props.auth;
    const username = user !== null && user !== undefined ? user.username : "User";
    const onClickElements = [ {"name": "Logout", "onClick": this.props.logoutUser} ];
    const leftMenuItems = [];
    leftMenuItems.push(<Link key="home" value="icon" to="/" id="icon">ReBookz</Link>)
    for (const [index, el] of GetMenuItemsByPage("Home", isAuthenticated).entries()) {
      leftMenuItems.push(<Link key={index} value={el["name"]} to={el["href"]} className="nav-item nav-link">{el["name"]}</Link>)
    }

    const rightMenuItems = isAuthenticated
    ? (
      <Fragment>
        <DropDownButton id="Notification" name="Notification" className="nav-link"
            icon={
              <Badge badgeContent={10} color="secondary">
                <MailIcon className="menuBar-icon"/>
              </Badge>
            }
        />
        <DropDownButton id="Cart" name="Cart" className="nav-link"
            onClickElements={onClickElements}
            dropDownElements={GetDropDownItems("User")}
            icon={
              <Badge badgeContent={10} color="secondary">
                <ShoppingCartOutlinedIcon className="menuBar-icon"/>
              </Badge>
            }
        />
        <DropDownButton id="User" name={username} className="nav-link"
            onClickElements={onClickElements}
            dropDownElements={GetDropDownItems("User")}
            icon={<AccountCircle className="menuBar-icon"/>}
        />
      </Fragment>
      )
    : (
      <Fragment>
        <Link to="/login" className="nav-item nav-link">Login</Link>
        <Link to="/Contact" className="nav-item nav-link">Contact</Link>
      </Fragment>
    );

    return (
      <Fragment>
        <nav className="navbar bg-black sticky-top navbarColor" style={ { height: "56px" } }>
          <div className="nav" id="nav-tab" role="tablist">
            {!isLoading ? leftMenuItems : <div></div>}
          </div>
          <div className="form-inline has-search center">
            <SearchOutlinedIcon className="btn fa fa-search form-control-feedback navbar-search-icon" />
            <input className="form-control mr-sm-2 navbar-search" name="search" type="search" placeholder="Search..." value={search} aria-label="Search" onChange={this.onChange} onKeyDown={this.searchBooks}/>
          </div>
          <div className="nav" id="nav-tab" role="tablist">
            {!isLoading ? rightMenuItems : <div></div>}
          </div>
        </nav>
      </Fragment>
    )
  }
}

function GetMenuItemsByPage(pageName, isAuthenticated) {
  let menuItems = [];
  if (pageName === "Home") {
    if (isAuthenticated)
      menuItems = [
        { "name": "Home", "href": "/" },
        { "name": "Search", "href": "/search" },
        { "name": "About", "href": "/about"}
      ];
  }
  return menuItems;
}

function GetDropDownItems(id) {
  // TODO currently hard-coded
  let elements = [];
  if (id === "User") {
    elements = [
      {"name": "Change Password", "href": "#"},
    ];
  }
  return elements;
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Menu);
