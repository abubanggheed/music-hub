import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Projects from '../Tables/ProjectTable';

class MyProjects extends Component {
  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
  }

  componentDidMount() {
    this.props.dispatch({type: 'MY_PROJECTS', payload: this.props.user.id});
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          { this.props.user.username }'s Projects
        </h1>
        <LogOutButton className="log-in" />
        <Projects />
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
