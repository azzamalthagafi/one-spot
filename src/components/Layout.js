import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container text-center">
      <br/>
				<div className="container">
				  <a role="button" className=" text-left btn btn-success" href="/">Home</a>
		    </div>
        <br/>
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
}