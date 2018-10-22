import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* userProjects(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('api/project/' + action.payload, config);
    yield dispatch({type: 'SET_TABLE', payload: response.data});
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
    yield axios.post('api/project', {name: action.payload});
  } catch (error) {
    console.log('Error with project posts:', error);
  }
}

function* projectSaga() {
  yield takeLatest('MY_PROJECTS', userProjects);
  yield takeLatest('PROJECTS', projects);
  yield takeLatest('NEW_PROJECT', addProject);
}

export default projectSaga;
