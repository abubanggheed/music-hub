import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//triggers on every action with .type = 'MY_PROJECTS', see projectSaga.
function* userProjects(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    //save the response reguarding a user's projects as response
    const response = yield axios.get('api/project/user/' + action.payload, config);
    //dispatches a new action to change a reducer to have the user's projects as the table
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
    //saves a response for all projects query as response
    const response = yield axios.get('api/project');
    //sets the table reducer for all projects
    yield dispatch({ type: 'SET_TABLE', payload: response.data });
  } catch (error) {
    console.log('Error with project gets:', error);
  }
}

function* addProject(action) {
  try {
    //post the data in action.payload in the project router.
    yield axios.post('api/project', { name: action.payload.name });
    //calls an action that will trigger userProjects
    yield dispatch({ type: 'MY_PROJECTS', payload: action.payload.user})
  } catch (error) {
    console.log('Error with project posts:', error);
  }
}

function* getInfo(action) {
  try {
    //optains the information about a particular project
    const response = yield axios.get('api/project/info/' + action.payload);
    //sets the info reducer to the response from the server
    yield dispatch({ type: 'SET_INFO', payload: response.data[0] });
  } catch (error) {
    console.log('Error with project info:', error);
  }
}

function* fixHead(action) {
  try {
    //sends a request to the server to verify that the project's head still exists.
    yield axios.put('/api/project/head/' + action.payload);
  } catch (error) {
    console.log('Error fixing head:', error);
  }
}

function* removeProject(action) {
  try {
    //the response here is an array of all songs in the project the user wishes to delete.
    const response = yield axios.get('api/song/project/' + action.payload.id);
    if(response.data.length > 0) {
      //if there is at least one song, the first song is deleted via the removeSong generator
      //in songSaga.js.
      yield dispatch({ type: 'DELETE_SONG', payload: {
         id: response.data[0].id,
         project_id: action.payload.id,
         next: action,
        } });
        //since removeSong dispatches the object in action.payload.next,
        //removeProject is called recursively untill there are no more songs left
        //under that project.
    } else {
      //if the project has no songs, an action that triggers apiRemoveProject is triggered instead.
      yield dispatch({ type: 'DELETE_PROJECT_DB', payload: action.payload });
    }
  } catch (error) {
    console.log('Error removing project:', error);
  }
}

function* apiRemoveProject(action) {
  try {
    //the server is asked to delete the project
    const response = yield axios.delete('api/project/' + action.payload.id);
    if (response.status === 200){
      //on success, userProjects is triggered again to uptain the updated table.
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
