import React, { Component } from 'react';
import { connect } from 'react-redux';
import Projects from '../Tables/ExploreTable'

class Explore extends Component {
  
  componentDidMount(){
    this.props.dispatch({type: 'PROJECTS'});
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Explore
        </h1>
        <Projects />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  table: state.table,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Explore);
