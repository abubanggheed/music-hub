import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadFooter from '../DownloadFooter/DownloadFooter';

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

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Play</th>
              <th>Download</th>
              {this.props.owner && <th>Choose New Head</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.table.filter(song => song.type === 'head').map(song => (
              <tr key={song.id}>
                <td>{song.name}</td>
                <td>{song.type}</td>
                <td><button>Play</button></td>
                <td><button onClick={() => this.handleDownload(song)}>Download</button></td>
              </tr>
            ))}
            {this.props.table.filter(song => song.type !== 'head').map(song => (
              <tr key={song.id}>
                <td>{song.name}</td>
                <td>{song.type}</td>
                <td><button>Play</button></td>
                <td><button onClick={() => this.handleDownload(song)}>Download</button></td>
                {this.props.owner && <td><button onClick={() => this.handleChoose(song)}>Choose</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
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