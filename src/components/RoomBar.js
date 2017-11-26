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
      <form onSubmit={this.handleSubmit}>
        <label>
          Room ID:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <Link to={`/room/${this.state.value}`}>
          <label>Join</label>
        </Link>
      </form>
    );
  }
}