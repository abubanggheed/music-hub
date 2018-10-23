import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';

class ProjectTable extends Component {

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stored Versions</th>
              <th>Play Head</th>
              <th>Go</th>
            </tr>
          </thead>
          <tbody>
            {this.props.table.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.number}</td>
                <td><button>Play</button></td>
                <td><ProjectButton page={project.id} /></td>
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