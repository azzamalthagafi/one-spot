import React from 'react';
import * as actions from '../actions/index.js';
import $ from 'jquery';


export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});

    // fetch results from server
    this.props.socket.emit('SEARCH', event.target.value);
  }

  render() {
    return (
    <input className="col-xs-12" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search for ..."/>
    );
  }
};