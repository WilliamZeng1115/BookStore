import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

const test = [
  {id: 1, title:'Halo Reach', author: 'Bungie', description:'this is a game',room:'GameRoom12345'},
  {id: 2, title:'Halo ODST',description:'this is a game2',room:'GameRoom123456'},
  {id: 3, title:'Halo 3',description:'this is a game3',room:'GameRoom1234567'}
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
            This is a popup and this is the book's info
            The ID is {id}.
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
