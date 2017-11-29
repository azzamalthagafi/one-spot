import React from 'react';
import { Link } from 'react-router';
import { createStore } from 'redux';
import { mainReducer as reducers } from '../reducers';
import * as actions from '../actions/index.js';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import $ from 'jquery';
import io from 'socket.io-client';



export default class Room extends React.Component {

  constructor(props) {
    super(props);
    this.state = {results: [], list: []};

    // redux store
    this.store = createStore(reducers, this.state);
  }

  componentDidMount() {
    this.store.subscribe(function () {
      this.setState(this.store.getState());
    }.bind(this));

    this.updatePlaylist();

    // Socket setup
    var socket = io.connect('http://localhost:3000', {query: 'id=' + this.props.params.id });

    socket.on('Playlist_updated', () => {
      this.updatePlaylist();
    });
  }

  updatePlaylist() {
    var self = this;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/getPlaylist",
        data: {
          "id": self.props.params.id
        },
        success: function(list) {
          self.setState((prevState, props) => {
            return {results: prevState.results, list: list};
          });
      }
    });
  }

  render() {
    const id = this.props.params.id;
    
    const searchdiv = (
      <div class="search-content">
        <div className="row"> <SearchBar store={this.store} id={id}/> </div>
        <div className="row"> <SearchResults store={this.store} results={this.state.results} id={id}/> </div>
      </div>
    );

    return (
      <div className="app-content">
        <div className="row h3">Welcome to {id}</div>
        <div className="row">
          <div className="col-xs-4 text-center"> {searchdiv} </div>
          <div className="col-xs-8 text-center"> <Playlist list={this.state.list}/> </div>
        </div>
        <div className="navigateBack">
          <Link to="/">Home Page</Link>
        </div>
      </div>
    );
  }

};
