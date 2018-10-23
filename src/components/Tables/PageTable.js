import React, { Component } from 'react';
import { connect } from 'react-redux';

class SongTable extends Component {

  handleChoose = song => {
    this.props.dispatch({ type: 'PROMOTE_SONG', payload: {
      project: this.props.project_id,
      song: song.id,
    }});
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Play</th>
              <th>Download</th>
              {this.props.owner && <th>Choose New Head</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.table.filter(song => song.type === 'head').map(song => (
              <tr key={song.id}>
                <td>{song.name}</td>
                <td>{song.type}</td>
                <td><button>Play</button></td>
                <td><button>Download</button></td>
              </tr>
            ))}
            {this.props.table.filter(song => song.type !== 'head').map(song => (
              <tr key={song.id}>
                <td>{song.name}</td>
                <td>{song.type}</td>
                <td><button>Play</button></td>
                <td><button>Download</button></td>
                {this.props.owner && <td><button onClick={() => this.handleChoose(song)}>Choose</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
});

export default connect(mapStateToProps)(SongTable);