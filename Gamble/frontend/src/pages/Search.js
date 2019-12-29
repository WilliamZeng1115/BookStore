import React, { Component, Fragment } from 'react'
import Rating from '@material-ui/lab/Rating';

import Info from '../components/Data/Info'


// TODO: get it from database...temporary
const allGames = [
  {id: 1, title:'test',description:'this is a game',room:'GameRoom12345'},
  {id: 2, title:'test2',description:'this is a game2',room:'GameRoom123456'},
  {id: 3, title:'test3',description:'this is a game3',room:'GameRoom1234567'}
];

export class Search extends Component {
  state = {
    games: allGames,
    showDetails: false,
    bookId: -1
  }

  myFunction(event) {
    this.setState({
      games: allGames.filter(g => g.title.includes(event.target.value))
    });
  }

  togglePopup(id) {
    this.setState({
      showDetails: id != -1,
      bookId: id
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.showDetails ? <Info id={this.state.bookId} onClose={this.togglePopup.bind(this, -1)}/> : null}
        <div id="search">
          <div className="searchItem" onClick={this.togglePopup.bind(this, 1)}>
            <div>
              <div className="bookTitle">Halo Reach</div>
              <div className="thumbnail"><img src="../../static/books/Halo.jpg"/></div>
              <div className="infoBox">
                <div className="content">
                  <label>Price</label>
                  <span className="value">$10.0</span>
                </div>
                <div className="content">
                  <label>Rating</label>
                  <Rating name="read-only" value={3} readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="searchItem" onClick={this.togglePopup.bind(this, 2)}>
            <div>
              <div className="bookTitle">Halo ODST</div>
              <div className="thumbnail"><img src="../../static/books/HaloODST.jpg" /></div>
              <div className="infoBox">
                <div className="content">
                  <label>Price</label>
                  <span className="value">$25.0</span>
                </div>
                <div className="content">
                  <label>Rating</label>
                  <Rating name="read-only" value={4} readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="searchItem" onClick={this.togglePopup.bind(this, 3)}>
            <div>
              <div className="bookTitle">Halo 3</div>
              <div className="thumbnail"><img src="../../static/books/Halo3.jpg" /></div>
              <div className="infoBox">
                <div className="content">
                  <label>Price</label>
                  <span className="value">$35.5</span>
                </div>
                <div className="content">
                  <label>Rating</label>
                  <Rating name="read-only" value={5} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Search
