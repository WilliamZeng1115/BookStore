import React, { Component, Fragment } from 'react'
import Rating from '@material-ui/lab/Rating';

import Info from '../components/Data/Info'


// TODO: get it from database...temporary
const allGames = [
  {id: 1, thumbnail: "../../static/books/Halo.jpg", rating: 3, title:'Halo Reach', author: 'Bungie', isbn:"123456789", description:'this is a game 1231234',  price: 10.0},
  {id: 2, thumbnail: "../../static/books/HaloODST.jpg", rating: 4, title:'Halo ODST', author: 'Bungie', isbn:"12345312346789", description:'this is a game qwewqeasd', price: 25.0},
  {id: 3, thumbnail: "../../static/books/Halo3.jpg",rating: 5, title:'Halo 3', author: 'Bungie', isbn:"1234541234678494", description:'this is a game zzzzzzzzzzzzzzzzz',price: 35.5},
];

export class Search extends Component {
  state = {
    books: allGames,
    showDetails: false,
    bookId: -1
  }

  togglePopup(id) {
    this.setState({
      showDetails: id != -1,
      bookId: id
    });
  }

  render() {
    if(this.props.location.state !== undefined) {
      const { search } = this.props.location.state;
      if(search !== undefined) {
        this.state.books = allGames.filter(g => g.title.includes(search));
      }
    }
    const searchItems = this.state.books.map((item, key) =>
      <div key={item.id} className="searchItem" onClick={this.togglePopup.bind(this, item.id)}>
        <div>
          <div className="bookTitle">{item.title}</div>
          <div className="thumbnail"><img src={item.thumbnail} /></div>
          <div className="infoBox">
            <div className="content">
              <label>Price</label>
              <span className="value">${item.price}</span>
            </div>
            <div className="content">
              <label>Rating</label>
              <Rating name="read-only" value={item.rating} readOnly />
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <Fragment>
        {this.state.showDetails ? <Info id={this.state.bookId} onClose={this.togglePopup.bind(this, -1)}/> : null}
        <div id="search">
          {searchItems}
        </div>
      </Fragment>
    )
  }
}

export default Search
