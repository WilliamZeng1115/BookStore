import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser, loginUser } from '../actions/api/auth'

import Cookies from 'js-cookie'

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: ''
  }

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2, firstName, lastName } = this.state;
    if(password !== password2) {
      return;
    }
    const newUser = {
      username, password, email, firstName, lastName
    };
    var that = this;
    this.props.registerUser(newUser).then(e => {
      that.props.loginUser(username, password);
    }).catch(e => {
     console.log("fail to register");
    });
  }

  onChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    const { username, email, password, password2, firstName, lastName } = this.state;
   return (
     <div className="col-md-6 m-auto">
       <div className="card card-body mt-5">
         <h2 className="text-center">Register</h2>
         <form onSubmit={this.onSubmit}>
           <div className="form-group">
             <label>First Name</label>
             <input
               type="text"
               className="form-control"
               name="firstName"
               onChange={this.onChange}
               value={firstName}
             />
           </div>
           <div className="form-group">
             <label>Last Name</label>
             <input
               type="text"
               className="form-control"
               name="lastName"
               onChange={this.onChange}
               value={lastName}
             />
           </div>
           <div className="form-group">
             <label>Username</label>
             <input
               type="text"
               className="form-control"
               name="username"
               onChange={this.onChange}
               value={username}
             />
           </div>
           <div className="form-group">
             <label>Email</label>
             <input
               type="email"
               className="form-control"
               name="email"
               onChange={this.onChange}
               value={email}
             />
           </div>
           <div className="form-group">
             <label>Password</label>
             <input
               type="password"
               className="form-control"
               name="password"
               onChange={this.onChange}
               value={password}
             />
           </div>
           <div className="form-group">
             <label>Confirm Password</label>
             <input
               type="password"
               className="form-control"
               name="password2"
               onChange={this.onChange}
               value={password2}
             />
           </div>
           <div className="form-group">
             <button type="submit" className="btn btn-primary">
               Register
             </button>
           </div>
           <p>
             Already have an account? <Link to="/login">Login</Link>
           </p>
         </form>
       </div>
     </div>
   )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { registerUser, loginUser })(Register);
