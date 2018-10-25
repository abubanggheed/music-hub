import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';
import PlayButton from '../LinkButtons/PlayButton';
import  { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class SongTable extends Component {

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Play</TableCell>
              <TableCell>Manage</TableCell>
              <TableCell>Go</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.table.map(song => (
              <TableRow key={song.id}>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.type}</TableCell>
                <TableCell><PlayButton song={song} /></TableCell>
                <TableCell><button>Manage</button></TableCell>
                <TableCell><ProjectButton page={song.project_id} /></TableCell>
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

export default connect(mapStateToProps)(SongTable);