import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Footer.css'

class Footer extends Component {

  componentDidMount() {
    this.props.history.push('/home');
  }
//the tables are set independant of the page, and don't refresh.
//This component forces the user to return to their home page on refresh
//so that they won't be confused as to where their table went.
  render() {
    return (
      <footer>
        <i>by abubanggheed</i>
  </footer>
    );
  }
}

export default withRouter(Footer);
