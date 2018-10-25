import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadFooter from '../DownloadFooter/DownloadFooter';
import PlayButton from '../LinkButtons/PlayButton';
import  { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';


class SongTable extends Component {

  state = {
    downloadDialog: false,
  }

  handleChoose = song => {
    this.props.dispatch({ type: 'PROMOTE_SONG', payload: {
      project: this.props.project_id,
      song: song.id,
    }});
  }

  handleDownload = song => {
    this.props.dispatch({type: 'GET_URLS', payload: song.id});
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
    this.props.dispatch({type: 'DOWNLOAD_URL', payload: {type: file.type, id: file.id }});
    this.handleCancel();
  }

  handlePlay = song => {
    console.log(song);
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
                <TableCell><button onClick={() => this.handleDownload(song)}>Download</button></TableCell>
              </TableRow>
            ))}
            {this.props.table.filter(song => song.type !== 'head').map(song => (
              <TableRow key={song.id}>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.type}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell><PlayButton song={song} /></TableCell>
                <TableCell><button onClick={() => this.handleDownload(song)}>Download</button></TableCell>
                {this.props.owner && <TableCell><button onClick={() => this.handleChoose(song)}>Choose</button></TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <dialog open={this.state.downloadDialog}>
          <h3>Available Downloads</h3>
          {this.props.urls.mp3Status && <pre><button onClick={() => this.handleFile({type: 'mp3', id: this.props.urls.id})}>Get mp3</button></pre>}
          {this.props.urls.wavStatus && <pre><button onClick={() => this.handleFile({type: 'wav', id: this.props.urls.id})}>Get wav</button></pre>}
          {this.props.urls.productionStatus && <pre><button onClick={() => this.handleFile({type: 'production', id: this.props.urls.id})}>Get production file</button></pre>}
          <button onClick={this.handleCancel}>Cancel</button>
        </dialog>
        <DownloadFooter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
  urls: state.url,
});

export default connect(mapStateToProps)(SongTable);