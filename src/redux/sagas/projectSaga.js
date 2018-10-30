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
    yield axios.post('api/project', { name: action.payload.name });
    yield dispatch({ type: 'MY_PROJECTS', payload: action.payload.user})
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
    const response = yield axios.get('api/song/project/' + action.payload.id);
    if(response.data.length > 0) {
      yield dispatch({ type: 'DELETE_SONG', payload: {
         id: response.data[0].id,
         project_id: action.payload.id,
         next: action,
        } });
    } else {
      yield dispatch({ type: 'DELETE_PROJECT_DB', payload: action.payload });
    }
  } catch (error) {
    console.log('Error removing project:', error);
  }
}

function* apiRemoveProject(action) {
  try {
    const response = yield axios.delete('api/project/' + action.payload.id);
    if (response.status === 200){
      yield dispatch({ type: 'MY_PROJECTS', payload: action.payload.user });
      yield dispatch({ type: 'PROJECT_CONFIRM_DELETE'});
    }
  } catch (error) {
    console.log('could not get into database:', error);
    yield dispatch({ type: 'PROJECT_DELETE_ERROR'});
  }
}

function* projectSaga() {
  yield takeLatest('MY_PROJECTS', userProjects);
  yield takeLatest('PROJECTS', projects);
  yield takeLatest('NEW_PROJECT', addProject);
  yield takeLatest('PROJECT_INFO', getInfo);
  yield takeLatest('FIX_HEAD', fixHead);
  yield takeLatest('DELETE_PROJECT', removeProject);
  yield takeLatest('DELETE_PROJECT_DB', apiRemoveProject);
}

export default projectSaga;
