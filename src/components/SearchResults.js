import React from 'react';
import * as actions from '../actions/index.js';


export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(song) {
    var self = this;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/addSong",
        data: {
          "song": song,
          "id": self.props.id
        },
        success: function(result) {
          self.props.store.dispatch(actions.addSong(song));
        }
      }
    );
  }

  render() {
    const divs = this.props.results.map((result, i) => {
      return (
        <tr>
          <th scope="row">
            <a href={result.url} target="_blank" >
            <img className="img-rounded" width="48" height="48" src={result.imgurl}/>
            </a>
          </th>
          <td>{result.title}</td>
          <td>{result.artist}</td>
          <td>
            <button type="button" className="btn btn-success" onClick={() => { this.onClick(result); } }>
              Add
            </button>
          </td>
        </tr>
      );
      }
    );

    if (divs.length) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th className="text-center"></th>
              <th className="text-center">Title</th>
              <th className="text-center">Artist</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {divs}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="table">
        </table>
      );
    }
  }
};