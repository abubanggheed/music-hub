import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import PlayButton from '../LinkButtons/PlayButton';

class ProjectTable extends Component {

  handleClick = project => {
    console.log(project);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.table.map(project => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.number}</TableCell>
                <TableCell>{project.head !== null && <PlayButton song={{ id: project.head }} />}</TableCell>
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