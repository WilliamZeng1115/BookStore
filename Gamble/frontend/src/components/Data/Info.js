import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

const test = [
  {id: 1, title:'Halo Reach', author: 'Bungie', isbn:"123456789", description:'this is a game 1231234', info: "1234123fasafv123gtsdg34fsdf", status: 0, price: 10.0, owner: {username: "test4321", firstName: "first", lastName: "last"}, createdAt: new Date()},
  {id: 2, title:'Halo ODST', author: 'Bungie', isbn:"12345312346789", description:'this is a game qwewqeasd', info: "1234123fasafv123gtsdg3dasfas1111111f4fsdf", status: 0, price: 25.0, owner: {username: "test41", firstName: "yes", lastName: "no"}, createdAt: new Date()},
  {id: 3, title:'Halo 3', author: 'Bungie', isbn:"1234541234678494", description:'this is a game zzzzzzzzzzzzzzzzz', info: "12341a11111111123fasafv123gtsdg34fsdf", status: 0, price: 35.5, owner: {username: "test123", firstName: "test", lastName: "me"}, createdAt: new Date()},
];

export class Info extends Component {
  render() {
    var { id, onClose } = this.props;

    var bookInfo = test.filter(t => t.id === id)[0];
    if(bookInfo === undefined) return (<div>No book selected</div>)

    return (
     <Fragment>
      <div id="popup">
        <div id="modal">
          <div>
            <label>Title</label><span>{bookInfo.title}</span>
            <label>Author</label><span>{bookInfo.author}</span>
            <label>Isbn</label><span>{bookInfo.isbn}</span>
            <label>Description</label><span>{bookInfo.description}</span>
            <label>Author</label><span>{bookInfo.author}</span>
            <label>Info</label><span>{bookInfo.info}</span>
            <label>Price</label><span>{bookInfo.price}</span>
            <label>Owner</label>
            <div>
              <span>{bookInfo.owner.username}</span>
              <span>{bookInfo.owner.firstName}</span>
              <span>{bookInfo.owner.lastName}</span>
            </div>
            <label>Created On</label><span>{bookInfo.createdAt.toString()}</span>
          </div>
          <Button color="secondary" variant="contained" onClick={this.props.onClose}  className="nav-link btn">Close</Button>
          <Button color="secondary" variant="contained" className="nav-link btn">Reserve</Button>
        </div>
      </div>
     </Fragment>
    )
  }
}

export default Info
