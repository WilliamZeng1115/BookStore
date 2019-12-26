// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addBlog }  from '../../actions/blogs';
// import Form from '../layout/Form'
//
// export class AddBlog extends Component {
//   state = {
//     title: '',
//     email: ''
//   };
//
//   static propTypes = {
//     addBlog: PropTypes.func.isRequired
//   };
//
//   onChange = e => this.setState({ [e.target.name]: e.target.value });
//
//   onSubmit = e => {
//     e.preventDefault();
//     const { title, email } = this.state;
//     const blog = { title, email };
//     const that = this;
//     this.props.addBlog(blog).then(f => {
//       that.setState({
//         title:'',
//         email:''
//       })
//     }).catch(e => {
//       console.log(e);
//     });
//   };
//
//   render() {
//     const titleField = { name: "title", onChange: this.onChange, attributes: { displayName: "Title" } };
//     const emailField = { name: "email", onChange: this.onChange, attributes: { displayName: "Email" } };
//     const { title, email } = this.state;
//     const attributes = { onSubmit: this.onSubmit }
//     const formSections = [{ attributes: { class: "form-group" },
//                              formItems: [ titleField, emailField ]}];
//     return (
//       <div className="card card-body mt-4 mb-4">
//         <h1>Add Entity</h1>
//         <Form attributes={attributes} formSections={formSections} />
//       </div>
//     )
//   }
// }
//
// export default connect(null, { addBlog })(AddBlog);
