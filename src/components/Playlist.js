import React from 'react';

export default class Playlist extends React.Component {
  render() {
    const divs = this.props.list.map((result, i) => {
      return 
        <div className="row">
          <div className="col-sm-4">{i}</div>
          <div className="col-sm-4">{result.title}</div>
          <div className="col-sm-4">{result.artist}</div>
        </div>
      }
    );

    return (
      <div className="playlist-content">
        <div className="row list-header">
          <div className="col-sm-4">#</div>
          <div className="col-sm-4">Title</div>
          <div className="col-sm-4">Artist</div>
        </div>
        <div className="row list-content">
          {divs}
        </div>
      </div>
    );
  }
};