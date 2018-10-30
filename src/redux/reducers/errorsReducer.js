import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'You must enter your username and password!';
    case 'LOGIN_FAILED':
      return 'Your username and password were considered and rejected. Try again.';
    case 'LOGIN_FAILED_NO_CODE':
      return 'Something has broken. Please try again later.';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'You must choose username, password, and email!';
    case 'REGISTRATION_FAILED':
      return 'An existing user already has that username or email!';
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
});
