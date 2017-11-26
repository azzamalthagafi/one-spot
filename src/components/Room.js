import React from 'react';
import { Link } from 'react-router';
import { createStore } from 'redux';
import { mainReducer as reducers } from '../reducers';
import * as actions from '../actions/index.js';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

export default class Room extends React.Component {

  constructor(props) {
    super(props);

    // redux store
    this.store = createStore(reducers, {"results": []});
  }

  render() {
    const id = this.props.params.id;
    
    const songs = [];

    const searchdiv = (
      <div class="search-content">
        <div className="row"> <SearchBar store={this.store}/> </div>
        <div className="row"> <SearchResults store={this.store}/> </div>
      </div>
    );

    return (
      <div className="app-content">
        <div className="row h1">Welcome to {id}</div>
        <div className="row">
          <div className="col-xs-4 text-center"> {searchdiv} </div>
          <div className="col-xs-8 text-center"> <Playlist list={songs}/> </div>
        </div>
        <div className="navigateBack">
          <Link to="/">Home Page</Link>
        </div>
      </div>
    );
  }
};
