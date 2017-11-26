import React from 'react';
import * as actions from '../actions/index.js';


export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: []}; 
  }

  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  render() {
    const divs = this.state.results.map((result, i) => {
      console.log(result);
      return (
        <tr>
          <th scope="row">{i}</th>
          <td>{result.title}</td>
          <td>{result.artist}</td>
        </tr>
      );
      }
    );

    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Title</th>
            <th className="text-center">Artist</th>
          </tr>
        </thead>
        <tbody>
          {divs}
        </tbody>
      </table>
    );
  }
};