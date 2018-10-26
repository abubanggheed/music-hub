import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import { DeleteSweep } from '@material-ui/icons';
import PlayButton from '../LinkButtons/PlayButton';

class ProjectTable extends Component {

  handleDelete = project => {
    this.props.dispatch({ type: 'DELETE_PROJECT', payload: project.id });
  }

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Stored Versions</TableCell>
              <TableCell>Play Head</TableCell>
              <TableCell>Go</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.table.map(project => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.number}</TableCell>
                <TableCell>{project.head !== null && <PlayButton song={{ id: project.head }} />}</TableCell>
                <TableCell><ProjectButton page={project.id} /></TableCell>
                <TableCell><IconButton onClick={() => this.handleDelete(project)}><DeleteSweep /></IconButton></TableCell>
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