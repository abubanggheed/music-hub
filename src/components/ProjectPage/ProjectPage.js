import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songs from '../Tables/PageTable';

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

  handleChange = param => event => {
    this.setState({
      ...this.state,
      newUpload: {
        ...this.state.newUpload,
        [param]: event.target.value,
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({type: 'NEW_SONG', payload: this.state.newUpload});
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
        <h1 id="welcome">
          {this.props.info.name}
        </h1>
        <h2>Creator: {this.props.info.username}</h2>
        <dialog open={this.state.uploadDialog}>
          <h3>New Remix</h3>
          <form onSubmit={this.handleSubmit}>
            <label onChange={this.handleChange('name')}>Name<input type="text" /></label>
            <pre><label>mp3<input onChange={this.handleChange('mp3')} type="text" /></label></pre>
            <pre><label>wav<input onChange={this.handleChange('wav')} type="text" /></label></pre>
            <pre><label>production file<input onChange={this.handleChange('production')} type="text" /></label></pre>
            <pre><input type="submit" /></pre>
          </form>
          <button onClick={this.cancleUpload}>Cancle</button>
        </dialog>
        <Songs />
        <button onClick={this.addRemix}>Add Remix</button>
        {JSON.stringify(this.state.newUpload)}
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
