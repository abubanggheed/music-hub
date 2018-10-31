import React from 'react';
import { connect } from 'react-redux';
import { ExitToApp } from '@material-ui/icons';

const LogOutButton = props => (
  <button
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    <ExitToApp />
    Log Out
  </button>
);

export default connect()(LogOutButton);
