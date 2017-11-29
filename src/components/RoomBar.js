import React from 'react';
import { Link } from 'react-router';


export default class RoomBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="row vertical-align">
        <div className="col-xs-2 col-xs-offset-2">
          <label className="h4">
           Room ID:
         </label>
        </div>
        <div className="col-xs-4">
          <input className="col-xs-12 input-sm" type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
        <a href={`/room/${this.state.value}`} className="btn btn-success col-xs-2" role="button"> Join </a>
      </div>
    );
  }
}