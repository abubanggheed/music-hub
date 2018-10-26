import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';
import PlayButton from '../LinkButtons/PlayButton';
import  { Dialog, Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import { ViewCarouselSharp, DeleteForever, Cancel } from '@material-ui/icons';

class SongTable extends Component {

  state = {
    manage: {
      open: false,
      song: null,
    },
  }

  handleManage = song => {
    this.setState({
      manage: {
        song: song,
        open: true,
      },
    });
  }

  handleClose = () => {
    this.setState({
      manage: {
        song: null,
        open: false,
      }
    });
  }

  handleDelete = () => {
    this.props.dispatch({ type: 'DELETE_SONG', payload: {...this.state.manage.song, user_id: this.props.user.id}} );
    this.handleClose();
  }

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
                <TableCell><IconButton onClick={() => this.handleManage(song)}><ViewCarouselSharp /></IconButton></TableCell>
                <TableCell><ProjectButton page={song.project_id} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={this.state.manage.open}>
          <Typography variant="h4">Manage {this.state.manage.song && this.state.manage.song.name}</Typography>
          <IconButton onClick={this.handleDelete}>Delete <DeleteForever /></IconButton>
          <IconButton onClick={this.handleClose}>Cancel <Cancel /></IconButton>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
  user: state.user,
});

export default connect(mapStateToProps)(SongTable);