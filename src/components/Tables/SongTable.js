import React, { Component } from 'react';
import { connect } from 'react-redux';

class SongTable extends Component {

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Project</th>
              <th>Play</th>
              <th>Manage</th>
              <th>Go</th>
            </tr>
          </thead>
          <tbody>
            {this.props.table.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.type}</td>
                <td><button>Play</button></td>
                <td><button>Manage</button></td>
                <td><button>project page</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {JSON.stringify(this.props.table)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
});

export default connect(mapStateToProps)(SongTable);