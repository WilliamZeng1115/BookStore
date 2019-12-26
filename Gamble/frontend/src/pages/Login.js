import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, loadUser } from '../actions/api/auth'

//import { Query, Mutation } from 'react-apollo'
//import { LOGIN_IN } from '../actionsGraphQL/auth'
import Form from '../components/layout/Form'

export class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    var that = this;
    this.props.loginUser(this.state.username, this.state.password).then(e => {
      console.log("loading user");
      that.props.loadUser();
    });
  }

  onChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const usernameField = { name: "username", onChange: this.onChange, attributes: { displayName: "Username" } };
    const passwordField = { name: "password", onChange: this.onChange, attributes: { type: "password", displayName: "Password" } };
    const { username, password } = this.state;
    const attributes = { submitButtonName: "Login", onSubmit: this.onSubmit };
    const formSections = [{ attributes: { class: "form-group" },
                            formItems: [ usernameField, passwordField ]}];
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <Form attributes={attributes} formSections={formSections}/>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
         </div>
       </div>
    )
   }
 }


 const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
 });
 export default connect(mapStateToProps, { loginUser, loadUser })(Login);
