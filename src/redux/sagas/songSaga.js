import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import firebase from '../../config';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

function storeSong(song) {
  const db = firebase.storage().ref();
  if (song) {
    let path = '/songs/' + (+new Date()) + '-' + song[0].name;
    return db.child(path).put(song[0]).then(snapshot => {
      return snapshot.task.location_.path_;
    });
  }
}

function deleteSongs(urls) {
  const db = firebase.storage().ref();
  return urls.forEach(url => {
    let path = db.child(url);
    path.delete().then(() => true).catch(() => false);
  });
}

function* userSongs(action) {
  try {
    const response = yield axios.get('api/song/mysongs/' + action.payload, config);
    yield dispatch({ type: 'SET_TABLE', payload: response.data });
  } catch (error) {
    console.log('Error with getting songs:', error);
    if (error.response.status === 403) {
      yield dispatch({ type: 'FORBIDDEN_TABLE' });
    } else {
      yield dispatch({ type: 'FETCH_FAILED' });
    }
  }
}

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
    let refs = {};
    refs.mp3 = yield storeSong(action.payload.mp3);
    refs.wav = yield storeSong(action.payload.wav);
    refs.production = yield storeSong(action.payload.production);
    yield axios.post('api/song/' + action.payload.project_id, { ...refs, name: action.payload.name });
    yield dispatch({ type: 'PROJECT_SONGS', payload: action.payload.project_id });
    yield dispatch({ type: 'FINISH_UPLOAD' });
  } catch (error) {
    console.log('Error with adding song:', error);
    yield dispatch({ type: 'UPLOAD_ERROR' });
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
    yield dispatch({ type: 'PROJECT_SONGS', payload: action.payload.project });
  } catch (error) {
    console.log('Error with promoting song:', error);
  }
}

function* removeSong(action) {
  try {
    const response = yield axios({
      method: 'DELETE',
      url: '/api/song/' + action.payload.id
    });
    yield deleteSongs(response.data.filter(song => song !== null));
    if (action.payload.type === 'head') {
      yield dispatch({ type: 'FIX_HEAD', payload: action.payload.project_id });
    }
    yield dispatch(action.payload.next);
  } catch (error) {
    console.log('Error in song delete:', error);
  }
}

function* songSaga() {
  yield takeLatest('MY_SONGS', userSongs);
  yield takeLatest('PROJECT_SONGS', projectSongs);
  yield takeLatest('NEW_SONG', addSong);
  yield takeLatest('PROMOTE_SONG', promoteSong);
  yield takeLatest('DELETE_SONG', removeSong);
}

export default songSaga;
