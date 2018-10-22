import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Songs from '../Tables/SongTable';

class MySongs extends Component {
  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
  }

  componentDidMount() {
    this.props.dispatch({type: 'MY_SONGS', payload: this.props.user.id});
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          { this.props.user.username }'s Songs
        </h1>
        <LogOutButton className="log-in" />
        <Songs />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MySongs);
