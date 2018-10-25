import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';
import  { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class ProjectTable extends Component {

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Versions</TableCell>
              <TableCell>Go</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.table.map(project => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.artist}</TableCell>
                <TableCell>{project.versions}</TableCell>
                <TableCell><ProjectButton page={project.id} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
});

export default connect(mapStateToProps)(ProjectTable);