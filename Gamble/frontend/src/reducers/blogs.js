// import { GET_BLOGS, DELETE_BLOGS, ADD_BLOG } from '../actions/types.js';
//
// const initialState = {
//   blogs: []
// }
//
// export default function(state = initialState, action) {
//   switch(action.type) {
//     case GET_BLOGS:
//       return {
//         ...state,
//         blogs: action.payload.data.tests.edges
//       };
//     case DELETE_BLOGS:
//       return {
//         ...state,
//         blogs: state.blogs.filter(b => b.node.id !== action.payload)
//       }
//     case ADD_BLOG:
//       const node = {
//         node: {
//           id: action.payload.data.testCreate.test.id,
//           title: action.payload.data.testCreate.test.title,
//           email: action.payload.data.testCreate.test.email,
//           created_at: action.payload.data.testCreate.test.created_at,
//         }
//       }
//       return {
//         ...state,
//         blogs: [...state.blogs, node]
//       }
//     default:
//       return state;
//   }
// }
