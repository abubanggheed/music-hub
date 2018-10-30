import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

class UserPage extends Component {
  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
  }

  render() {
    return (
      <div>
        <LogOutButton className="log-in" />
        <h1 className="welcome">
          Welcome, {this.props.user.username}!
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserPage);

