import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import firebase from '../../config';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

function storeSong(song) {
  const db = firebase.storage().ref();
  if(song){
    let path = '/songs/' + (+new Date()) + '-' + song[0].name;
    db.child(path).put(song[0]).then(snapshot => {
      console.log(snapshot.task.location_);
      return snapshot.task.location_;
    });
  }
}

function* userSongs(action) {
  try {
    const response = yield axios.get('api/song/mysongs/' + action.payload, config);
    yield dispatch({type: 'SET_TABLE', payload: response.data});
  } catch (error) {
    console.log('Error with getting songs:', error);
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
    const response = yield axios.get('api/song/project/' + action.payload);
    yield dispatch({ type: 'SET_TABLE', payload: response.data });
  } catch (error) {
    console.log('Error with getting songs:', error);
  }
}

function* addSong(action) {
  try {
    const refs = {};
    refs.mp3 = yield storeSong(action.payload.mp3);
    refs.wav = yield storeSong(action.payload.wav);
    refs.production = yield storeSong(action.payload.production);
    yield axios.post('api/song/' + action.payload.project_id, {...refs, name: action.payload.name});
    yield dispatch({ type: 'PROJECT_SONGS', payload: action.payload.project_id });
  } catch (error) {
    console.log('Error with adding song:', error);
  }
}

function* promoteSong(action) {
  try {
    yield axios({
      method: 'PUT',
      url: '/api/song/head',
      params: {
        ...action.payload
      }
    });
    yield dispatch({ type: 'PROJECT_SONGS', payload: action.payload.project});
  } catch (error) {
    console.log('Error with promoting song:', error);
  }
}

function* songSaga() {
  yield takeLatest('MY_SONGS', userSongs);
  yield takeLatest('PROJECT_SONGS', projectSongs);
  yield takeLatest('NEW_SONG', addSong);
  yield takeLatest('PROMOTE_SONG', promoteSong);
}

export default songSaga;
