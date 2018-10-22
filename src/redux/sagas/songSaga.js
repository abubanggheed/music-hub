import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* userSongs(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('api/song/mysongs/' + action.payload, config);
    yield dispatch({type: 'SET_TABLE', payload: response.data});
  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 403) {
      yield dispatch({ type: 'FORBIDDEN_TABLE' });
    } else {
      yield dispatch({ type: 'FETCH_FAILED' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* projectSongs(action) {
  try {
    const response = yield axios.post('api/song.project' + action.payload);
    yield dispatch({ type: 'SET_TABLE', payload: response.rows });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* songSaga() {
  yield takeLatest('MY_SONGS', userSongs);
  yield takeLatest('PROJECT_SONGS', projectSongs);
}

export default songSaga;
