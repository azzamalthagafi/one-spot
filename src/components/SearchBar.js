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

    $.ajax({
        method: "POST",
        url: "https://localhost:3000/search",
        data: {
          "query": "query"
        },
        success: function(result) {
          // handle result...
        }
      }
    );
    this.props.store.dispatch(actions.search(event.target.value));
  }

  render() {
    return (
    <input type="text" value={this.state.value} onChange={this.handleChange} />
    );
  }
};