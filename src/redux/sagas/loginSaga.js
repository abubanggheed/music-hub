import { put as dispatch, takeLatest } from 'redux-saga/effects';
//put is imported as dispatch since "dispatch" describes what put does
//better than "put"
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    // clear any existing error on the login page
    yield dispatch({ type: 'CLEAR_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post('api/user/login', action.payload, config);
    
    // after the user has logged in
    // get notifications for later
    this.props.dispatch({ type: 'GET_NOTIFICATIONS' });
    // get the user information from the server
    yield dispatch({type: 'FETCH_USER'});
  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {
      yield dispatch({ type: 'OPEN_LOGIN_ERROR' });
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield dispatch({ type: 'LOGIN_FAILED' });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield dispatch({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('api/user/logout', config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield dispatch({ type: 'UNSET_USER' });

  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
