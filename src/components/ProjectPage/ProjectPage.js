import React, { Component } from 'react';
import { connect } from 'react-redux';
import Songs from '../Tables/PageTable';

class ProjectPage extends Component {

  render() {
    return (
      <div>
        <h1 id="welcome">
          {this.props.name}
        </h1>
        <Songs />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  table: state.table,
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ProjectPage);
