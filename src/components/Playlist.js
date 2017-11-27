import React from 'react';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const divs = this.props.list.map((result, i) => {
      return (
        <tr>
          <th scope="row">{i} </th>
          <td>
            <a href={result.url} target="_blank" >
            <img className="img-rounded" width="48" height="48" src={result.imgurl}/>
            </a>
          </td>
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
            <th className="text-center"></th>
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