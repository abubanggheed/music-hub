import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import table from './tableReducer';
import info from './infoReducer';
import url from './urlReducer';
import download from './downloadReducer';
import messages from './messagesReducer';
import notifications from './notificationsReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  table, //will have an array of all items to make a table out of
  info, //will have some information about a particular project
  url, //will hold urls for available downloads
  download, //will hold the download url for the current download, and currently playing audio
  messages, //will hold values to determine which dialog is open
  notifications, //will hold values that show up on the notifications page
});

export default rootReducer;
