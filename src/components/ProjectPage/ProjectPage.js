import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songs from '../Tables/PageTable';
import { IconButton, Dialog, Typography, Input, InputLabel } from '@material-ui/core';
import { CloudUpload, Cancel } from '@material-ui/icons';

class ProjectPage extends Component {

  state = {
    uploadDialog: false,
    newUpload: {
      name: '',
      mp3: '',
      wav: '',
      production: '',
    }
  }

  addRemix = () => {
    this.setState({
      ...this.state,
      uploadDialog: true,
    });
  }

  cancleUpload = () => {
    this.setState({
      ...this.state,
      uploadDialog: false,
    })
  }
  //handleChange sets a state to the file put into one of the 3 file inputs
  handleChange = param => event => {
    this.setState({
      ...this.state,
      newUpload: {
        ...this.state.newUpload,
        [param]: event.target.files,
      }
    });
  }
  handleNameChange = event => {
    this.setState({
      ...this.state,
      newUpload: {
        ...this.state.newUpload,
        name: event.target.value,
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'START_UPLOAD' });
    this.props.dispatch({
      type: 'NEW_SONG',
      payload: { ...this.state.newUpload, project_id: this.props.info.project_id }
    });
    this.setState({
      uploadDialog: false,
      newUpload: {
        name: '',
        mp3: '',
        wav: '',
        production: '',
      }
    });
  }


  render() {
    return (
      <div>
        <h1 className="welcome">
          {this.props.info.name}
        </h1>
        <h2 className="welcome">Creator: {this.props.info.username}</h2>
        <Dialog open={this.state.uploadDialog}>
          <div className="generalDialog">
            <Typography variant="h5">New Remix</Typography>
            <form onSubmit={this.handleSubmit}>
              <InputLabel required>Name<Input value={this.state.newUpload.name} onChange={this.handleNameChange} type="text" required /></InputLabel>
              <InputLabel required>mp3<Input accept=".mp3" name="mp3" files={this.state.newUpload.mp3} onChange={this.handleChange('mp3')} type="file" required /></InputLabel>
              <InputLabel>wav<Input name="wav" accept=".wav" files={this.state.newUpload.wav} onChange={this.handleChange('wav')} type="file" /></InputLabel>
              <InputLabel>production file (zip)<Input accept=".zip" name="production" files={this.state.newUpload.production} onChange={this.handleChange('production')} type="file" /></InputLabel>
              <Input type="submit" value="upload files" />
            </form>
            <IconButton color="secondary" onClick={this.cancleUpload}><Cancel />Cancle</IconButton>
          </div>
        </Dialog>
        <Songs project_id={this.props.info.project_id}
          owner={this.props.user.username === this.props.info.username} />
        <IconButton color="primary" onClick={this.addRemix}><CloudUpload /> Add Remix</IconButton>
        {/* this button opens the above dialog */}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  info: state.info,
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ProjectPage);
