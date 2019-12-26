// import React, { Component, Fragment } from 'react'
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { getBlogs, deleteBlogs } from '../../actions/blogs'
// import Grid from '../layout/Grid'
// import { GridDataRowBuilder } from '../layout/Controls'
//
// import AddBlog from '../Data/AddBlog'
//
// export class Blog extends Component {
//   static propTypes = {
//     blogs: PropTypes.array.isRequired,
//     getBlogs: PropTypes.func.isRequired,
//     deleteBlogs: PropTypes.func.isRequired
//   }
//
//   componentDidMount() {
//     this.props.getBlogs();
//   }
//
//   render() {
//     const gridAttributes = { showID: false, buttonSize: "medium" };
//     const columns = ['ID', 'Title', 'Email', 'Created At', 'Delete Action' ];
//     const dataRows = [];
//     this.props.blogs.forEach((el) => {
//       const deleteAction = [{ name: "Delete",
//                               action: () => this.props.deleteBlogs(el.node.id),
//                               attributes: { size: "small"}}];
//       const buttonActions = { "Delete Action": deleteAction };
//       dataRows.push(GridDataRowBuilder(columns, el.node, buttonActions));
//     });
//     return (
//       <Fragment>
//         <h1> Blogs </h1>
//         <AddBlog />
//         <Grid columns={columns} rows={dataRows} attributes={gridAttributes} />
//       </Fragment>
//     )
//   }
// }
//
// const mapStateToProps = state => ({
//   blogs: state.blogs.blogs
// });
//
// export default connect(mapStateToProps, { getBlogs, deleteBlogs })(Blog)
