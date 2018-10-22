import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectTable extends Component {
  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
  }

  render() {
    return (
      <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Stored Versions</th>
                    <th>Play Head</th>
                    <th>Go</th>
                </tr>
            </thead>
        </table>
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
export default connect(mapStateToProps)(ProjectTable);