import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';

class SongTable extends Component {

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Play</th>
              <th>Manage</th>
              <th>Go</th>
            </tr>
          </thead>
          <tbody>
            {this.props.table.map(song => (
              <tr key={song.id}>
                <td>{song.name}</td>
                <td>{song.type}</td>
                <td><button>Play</button></td>
                <td><button>Manage</button></td>
                <td><ProjectButton page={song.project_id} /></td>
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