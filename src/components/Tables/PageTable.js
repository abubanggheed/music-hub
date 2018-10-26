import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadFooter from '../DownloadFooter/DownloadFooter';
import PlayButton from '../LinkButtons/PlayButton';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { IconButton, Dialog, DialogContent, Typography } from '@material-ui/core';
import { CloudDownload, ArrowUpwardOutlined, CancelOutlined, MusicNote, MusicNoteSharp, FileCopy, DeleteForever } from '@material-ui/icons';

class SongTable extends Component {

  state = {
    downloadDialog: false,
  }

  handleChoose = song => {
    this.props.dispatch({
      type: 'PROMOTE_SONG', payload: {
        project: this.props.project_id,
        song: song.id,
      }
    });
  }

  handleDownload = song => {
    this.props.dispatch({ type: 'GET_URLS', payload: song.id });
    this.setState({
      downloadDialog: true,
    });
  }

  handleCancel = () => {
    this.setState({
      downloadDialog: false,
    });
  }

  handleFile = file => {
    this.props.dispatch({ type: 'DOWNLOAD_URL', payload: { type: file.type, id: file.id } });
    this.handleCancel();
  }

  handleDelete = song => {
    this.props.dispatch({
      type: 'DELETE_SONG', payload: {
        ...song, user_id: this.props.user.id,
        next: { type: 'PROJECT_SONGS', payload: this.props.project_id},
      }
    });
  }

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Play</TableCell>
              {this.props.owner && <TableCell>Delete</TableCell>}
              <TableCell>Download</TableCell>
              {this.props.owner && <TableCell>Choose New Head</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.table.filter(song => song.type === 'head').map(song => (
              <TableRow key={song.id}>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.type}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell><PlayButton song={song} /></TableCell>
                {this.props.owner && <TableCell><IconButton onClick={() => this.handleDelete(song)}><DeleteForever /></IconButton></TableCell>}
                <TableCell><IconButton onClick={() => this.handleDownload(song)}><CloudDownload /></IconButton></TableCell>
              </TableRow>
            ))}
            {this.props.table.filter(song => song.type !== 'head').map(song => (
              <TableRow key={song.id}>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.type}</TableCell>
                <TableCell>{song.artist || 'anonymous'}</TableCell>
                <TableCell><PlayButton song={song} /></TableCell>
                {this.props.owner && <TableCell><IconButton onClick={() => this.handleDelete(song)}><DeleteForever /></IconButton></TableCell>}
                <TableCell><IconButton onClick={() => this.handleDownload(song)}><CloudDownload /></IconButton></TableCell>
                {this.props.owner && <TableCell><IconButton onClick={() => this.handleChoose(song)}><ArrowUpwardOutlined /></IconButton></TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={this.state.downloadDialog}>
          <Typography variant="h4">Available Downloads</Typography>
          <DialogContent>
            {this.props.urls.mp3Status && <pre><IconButton onClick={() => this.handleFile({ type: 'mp3', id: this.props.urls.id })}><MusicNote />Get mp3</IconButton></pre>}
            {this.props.urls.wavStatus && <pre><IconButton onClick={() => this.handleFile({ type: 'wav', id: this.props.urls.id })}><MusicNoteSharp />Get wav</IconButton></pre>}
            {this.props.urls.productionStatus && <pre><IconButton onClick={() => this.handleFile({ type: 'production', id: this.props.urls.id })}><FileCopy />Get production file</IconButton></pre>}
            <IconButton onClick={this.handleCancel}><CancelOutlined />Cancel</IconButton>
          </DialogContent>
        </Dialog>
        <DownloadFooter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
  urls: state.url,
  user: state.user,
});

export default connect(mapStateToProps)(SongTable);