import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container text-center">
        <header>
          <Link to="/">
            <img src="/images/onespot.png" width="420"/>
          </Link>
        </header>
        <br/>
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
}