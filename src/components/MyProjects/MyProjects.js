import React, { Component } from 'react';
import { connect } from 'react-redux';
import Projects from '../Tables/ProjectTable';
import NewProject from '../LinkButtons/NewProjectButton';

class MyProjects extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'MY_PROJECTS', payload: this.props.user.id});
  }

  render() {
    return (
      <div>
        <h1 className="welcome">
          { this.props.user.username }'s Projects
        </h1>
        <Projects />
        <NewProject />
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
export default connect(mapStateToProps)(MyProjects);
