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
        <h4 className="text-center" style={{marginTop: "0.5em", marginBottom: "2em"}}>Hello, please enter a playlist name to join. </h4>
        <div className="col-xs-2 text-right col-xs-offset-2">
          <label className="h4">
           Room ID:
         </label>
        </div>
        <div className="col-xs-4">
          <input className="col-xs-12 input-sm" style={{marginTop: "0.2em"}} type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
        <a href={`/room/${this.state.value}`} className="btn btn-success col-xs-2" role="button"> Join </a>
      </div>
    );
  }
}