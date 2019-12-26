import React, { Component, Fragment } from 'react'
import Grid from '../components/layout/Grid'
import { GridDataRowBuilder } from '../components/layout/Controls'

// TODO: get it from database...temporary
const allGames = [
  {id: 1, title:'test',description:'this is a game',room:'GameRoom12345'},
  {id: 2, title:'test2',description:'this is a game2',room:'GameRoom123456'},
  {id: 3, title:'test3',description:'this is a game3',room:'GameRoom1234567'}
];

export class Search extends Component {
  state = {
    games: allGames
  }

  myFunction(event) {
    this.setState({
      games: allGames.filter(g => g.title.includes(event.target.value))
    });
  }

  joinGame(game) {
    let room = allGames.filter(g => g.title === game)[0].room;
    this.props.history.push({
      pathname: '/game',
      state: {room:room}
    })
  }

  render() {
    const columns = ['ID', 'Title' ,'Description', 'Action']
    const dataRows = [];
    this.state.games.forEach((el) => {
      const buttonActions = {"Action": [ {name: "Join", onClick: this.joinGame.bind(this, el.title)} ]}
      dataRows.push(GridDataRowBuilder(columns, el, buttonActions));
    })
    return (
      <Fragment>
        <h2> Search for custom games </h2>
        <br />
        <input type="text" id="myInput" onKeyUp={this.myFunction.bind(this)} placeholder="Search for names.." title="Type in a name" />
        <Grid columns={columns} rows={dataRows} />
      </Fragment>
    )
  }
}

export default Search
