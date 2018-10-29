import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Footer.css'

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
