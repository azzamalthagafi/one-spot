import React from 'react';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;

    this.remove = this.remove.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);


  }


  remove(index) {
    this.props.socket.emit('REMOVE_SONG', {id: this.id, index: index});
  }

  moveUp(index) {
    if (index > 0) {
      this.props.socket.emit('MOVEUP_SONG', {id: this.id, index: index});
    }
  }

  moveDown(index) {
    if (index < this.props.list.length - 1) {
      this.props.socket.emit('MOVEDOWN_SONG', {id: this.id, index: index});
    }
  }

  render() {

    const divs = this.props.list.map((result, i) => {
      return (
        <tr>
          <th scope="row"> 
            <div className="btn-group-vertical" role="group" aria-label="...">
              <button type="button" style={{fontSize: "10px"}} className="btn btn-default glyphicon glyphicon-chevron-up" onClick={() => { console.log("moving " + i + " to " + i-1); this.moveUp(i); } }></button>
              <button type="button" style={{fontSize: "10px"}} className="btn btn-default glyphicon glyphicon-chevron-down" onClick={() => { console.log("moving " + i + " to " + i+1); this.moveDown(i); } }></button>
            </div>
          </th>
          <td>{i}</td>
          <td>
            <a href={result.url} target="_blank" >
            <img className="img-rounded" width="48" height="48" src={result.imgurl}/>
            </a>
          </td>
          <td>{result.title}</td>
          <td>{result.artist}</td>
          <td>
            <button type="button" className="btn btn-danger glyphicon glyphicon-remove" onClick={() => { this.remove(i); } }>
            </button>
          </td>
        </tr>
      );
      }
    );

    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-center"></th>
            <th className="text-center">#</th>
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
  }
};