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
        <h1 className="welcome">
          Explore
        </h1>
        <Projects />
      </div>
    );
  }
}

export default connect()(Explore);
