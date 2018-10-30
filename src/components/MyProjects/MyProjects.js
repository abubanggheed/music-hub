import React, { Component } from 'react';
import { connect } from 'react-redux';
import Projects from '../Tables/ProjectTable';
import NewProject from '../LinkButtons/NewProjectButton';

class MyProjects extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'MY_PROJECTS', payload: this.props.user.id});
  }
//this component displays all projects that the user created.
  render() {
    return (
      <div>
        <h1 className="welcome">
          { this.props.user.username }'s Projects
        </h1>
        <Projects />
        <NewProject />{/* the new project button */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MyProjects);
