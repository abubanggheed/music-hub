import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectTable extends Component {

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Versions</th>
              <th>Go</th>
            </tr>
          </thead>
          <tbody>
            {this.props.table.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.artist}</td>
                <td>{project.versions}</td>
                <td><button>project page</button></td>
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

export default connect(mapStateToProps)(ProjectTable);