import React from 'react';
import * as actions from '../actions/index.js';
import $ from 'jquery';


export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  handleChange(event) {
    this.setState({value: event.target.value});

    // fetch results from server then dispatch search action
    var self = this;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/search",
        data: {
          "query": event.target.value
        },
        success: function(result) {
          if (result.body == undefined) {
            var simplified = []
          } else {
            var sliced = result.body.tracks.items.slice(0, 10);
            console.log(sliced);
            var simplified = sliced.map((result) => {
            var artist = result.artists[0].name;
            if (result.artists.length > 1) {
              for (var i = 0; i < result.artists.length; i++) {
                artist += ', ' + result.artists[i].name;
              }
            }
              return {title: result.name,
                      artist: artist, 
                      imgurl: result.album.images[2].url,
                      url: result.external_urls.spotify};
            });
          }
          self.props.store.dispatch(actions.search(simplified));
        }
      }
    );
  }

  render() {
    return (
    <input className="col-xs-12" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search for ..."/>
    );
  }
};