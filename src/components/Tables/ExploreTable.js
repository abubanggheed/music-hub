import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';
import { Table, TableHead, TableBody, TableRow, TableCell, Input, InputLabel, Paper } from '@material-ui/core';
import PlayButton from '../LinkButtons/PlayButton';

class ProjectTable extends Component {

  state = {
    filter: '',
  }

  handleChange = event => {
    this.setState({
      filter: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <InputLabel>
          Search by Name: {' '}
          <Input type="text" value={this.state.filter} onChange={this.handleChange} />
        </InputLabel>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Versions</TableCell>
                <TableCell>Play Head</TableCell>
                <TableCell>Go</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.table.filter(project => project.name.includes(this.state.filter)).map(project => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.artist}</TableCell>
                  <TableCell>{project.versions}</TableCell>
                  <TableCell>{project.head && <PlayButton song={{ id: project.head }} />}</TableCell>
                  <TableCell><ProjectButton page={project.id} /></TableCell>
                </TableRow>
              ))}{/* this map makes an array of TableRows that are all rendered inside of the TableBody */}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
});

export default connect(mapStateToProps)(ProjectTable);