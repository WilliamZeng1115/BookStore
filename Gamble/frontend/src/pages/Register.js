import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser, loginUser } from '../actions/api/auth'

import Form from '../components/layout/Form'

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

    const usernameField = { name: "username", onChange: this.onChange, attributes: { displayName: "Username" } };
    const emailField = { name: "email", onChange: this.onChange, attributes: { displayName: "Email" } };
    const passwordField = { name: "password", onChange: this.onChange, attributes: { type: "password", displayName: "Password" } };
    const password2Field = { name: "password2", onChange: this.onChange, attributes: { type: "password", displayName: "Confirm Password" } };
    const firstNameField = { name: "firstName", onChange: this.onChange, attributes: { displayName: "First Name" } };
    const lastNameField = { name: "lastName", onChange: this.onChange, attributes: {  displayName: "Last Name" } };
    const attributes = { submitButtonName: "Register", onSubmit: this.onSubmit };
    const formSections = [{ attributes: { class: "form-group" },
                            formItems: [ usernameField, emailField, passwordField, password2Field, firstNameField, lastNameField ] }];

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <Form attributes={attributes} formSections={formSections} />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { registerUser, loginUser })(Register);
