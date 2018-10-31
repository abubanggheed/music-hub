import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserPage extends Component {
  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
  }

  render() {
    return (
      <div>
        <h1 className="welcome">
          You are logged in, {this.props.user.username}!
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserPage);

