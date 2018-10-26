import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* userProjects(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('api/project/user/' + action.payload, config);
    yield dispatch({ type: 'SET_TABLE', payload: response.data });
  } catch (error) {
    console.log('Error with project gets:', error);
    if (error.response.status === 403) {
      yield dispatch({ type: 'FORBIDDEN_TABLE' });
    } else {
      yield dispatch({ type: 'FETCH_FAILED' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* projects(action) {
  try {
    const response = yield axios.get('api/project');
    yield dispatch({ type: 'SET_TABLE', payload: response.data });
  } catch (error) {
    console.log('Error with project gets:', error);
  }
}

function* addProject(action) {
  try {
    yield axios.post('api/project', { name: action.payload });
  } catch (error) {
    console.log('Error with project posts:', error);
  }
}

function* getInfo(action) {
  try {
    const response = yield axios.get('api/project/info/' + action.payload);
    yield dispatch({ type: 'SET_INFO', payload: response.data[0] });
  } catch (error) {
    console.log('Error with project info:', error);
  }
}

function* fixHead(action) {
  try {
    yield axios.put('/api/project/head/' + action.payload);
  } catch (error) {
    console.log('Error fixing head:', error);
  }
}

function* removeProject(action) {
  try {
    const response = yield axios.get('api/song/project/' + action.payload);
    if (response.data !== null) {
      yield () => {
        response.data.forEach(song => {
          dispatch({
            type: 'DELETE_SONG', payload: {
              id: song.id,
              project_id: action.payload.project_id,
              next: { type: 'DO_NOTHING' },
            }
          });
        });
      }
    }
    yield axios.delete('api/project/' + action.payload);
    yield dispatch({ type: 'MY_PROJECTS' });
  } catch (error) {
    console.log('Error removing project:', error);
  }
}

function* projectSaga() {
  yield takeLatest('MY_PROJECTS', userProjects);
  yield takeLatest('PROJECTS', projects);
  yield takeLatest('NEW_PROJECT', addProject);
  yield takeLatest('PROJECT_INFO', getInfo);
  yield takeLatest('FIX_HEAD', fixHead);
  yield takeLatest('DELETE_PROJECT', removeProject);
}

export default projectSaga;
