import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Footer extends Component{

  componentDidMount(){
    this.props.history.push('/home');
  }

  render() {
    return (
      <footer>
        &copy; Prime Digital Academy
  </footer>
    );
  }
}

export default withRouter(Footer);
