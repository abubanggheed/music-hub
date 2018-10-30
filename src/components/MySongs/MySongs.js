import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songs from '../Tables/SongTable';
//this component displays all songs the user uploaded
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
        <h1 className="welcome">
          { this.props.user.username }'s Songs
        </h1>
        <Songs />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MySongs);
