import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container text-center">
        <header>
          <Link to="/">
            <h1>One-Spot</h1>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            I really hope this works.
          </p>
        </footer>
      </div>
    );
  }
}