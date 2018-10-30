import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import firebase from '../../config';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

function storeSong(song) {
  //the song is placed inside of firebase storage, and the path is returned
  const db = firebase.storage().ref();
  if (song) {
    let path = '/songs/' + (+new Date()) + '-' + song[0].name;
    return db.child(path).put(song[0]).then(snapshot => {
      return snapshot.task.location_.path_;
    });
  }
}

function deleteSongs(urls) {
  //all songs corresponding to an array of urls are deleted here.
  const db = firebase.storage().ref();
  return Promise.all(urls.map(url => {
    let path = db.child(url);
    return path.delete();
    //the map function returns an array of promises, those promises are combined
    //into one promise using Promise.all.
  }));
}

function* userSongs(action) {
  try {
    //all songs that appear under my songs are obtained and sent on their way here.
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
    //obtains and sends songs ascociated with a certain project.
    const response = yield axios.get('api/song/project/' + action.payload);
    yield dispatch({ type: 'SET_TABLE', payload: response.data });
  } catch (error) {
    console.log('Error with getting songs:', error);
  }
}

function* addSong(action) {
  try {
    //builds an object with all urls for a download.
    let refs = {};
    refs.mp3 = yield storeSong(action.payload.mp3);
    refs.wav = yield storeSong(action.payload.wav);
    refs.production = yield storeSong(action.payload.production);
    //once the urls are returned from storeSong, the urls are posted to the server
    yield axios.post('api/song/' + action.payload.project_id, { ...refs, name: action.payload.name });
    //on complete, projectSongs is triggered to obtain an updated list.
    yield dispatch({ type: 'PROJECT_SONGS', payload: action.payload.project_id });
    yield dispatch({ type: 'FINISH_UPLOAD' });
  } catch (error) {
    console.log('Error with adding song:', error);
    yield dispatch({ type: 'UPLOAD_ERROR' });
  }
}

function* promoteSong(action) {
  try {
    //set a chosed song to the head of the project.
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
    //the delete method called returns the urls that were removed from the database.
    const response = yield axios({
      method: 'DELETE',
      url: '/api/song/' + action.payload.id
    });
    //an array of all non-null urls are passed to deleteSongs to be removed from the storage.
    yield deleteSongs(response.data.filter(song => song !== null));
    if (action.payload.type === 'head') {
      //on deleting a head, the project's head must be updated.
      yield dispatch({ type: 'FIX_HEAD', payload: action.payload.project_id });
    }
    //songs may be deleted in many different locations. To account for this,
    //the payload has a next, which is an object to dispatch. This was made
    //for getting the correct updated table of songs based on which view the
    //user was on. It also helps in the recursive logic behind deleting a project.
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
