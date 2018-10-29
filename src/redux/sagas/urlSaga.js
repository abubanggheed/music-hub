import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import firebase from '../../config';

function getdownloadUrl (path){
    const download = firebase.storage().ref(path);
    return download.getDownloadURL().then(url => {
        return url;
    });
}

function* urlAvailability(action) {
    try {
        const availibility = yield axios.get('api/url/available/' + action.payload);
        yield dispatch({ type: 'SET_URLS', payload: availibility.data});
    } catch (error) {
        console.log('error getting url availability:', error);
    }
}

function* urlGet(action) {
    try {
        yield dispatch({ type: 'START_DOWNLOAD' });
        yield dispatch({ type: 'CLEAR_DOWNLOAD' });
        const response = yield axios({
            method: 'GET',
            url: 'api/url/download',
            params: {...action.payload}
        });
        const downloadUrl = yield getdownloadUrl(response.data);
        yield dispatch({ type: 'SET_DOWNLOAD', payload: downloadUrl });
        yield dispatch({ type: 'FINISH_DOWNLOAD' });
    } catch (error) {
        console.log('error in download url:', error);
    }
}

function* playGet(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: 'api/url/play',
            params: {...action.payload}
        });
        const downloadUrl = yield getdownloadUrl(response.data);
        yield dispatch({ type: 'QUEUE_SONG', payload: downloadUrl });
        yield dispatch({ type: 'FINISH_SONG'});
    } catch (error) {
        console.log('error in getting mp3:', error);
    }
}


function* urlSaga() {
    yield takeLatest('GET_URLS', urlAvailability);
    yield takeLatest('DOWNLOAD_URL', urlGet);
    yield takeLatest('PLAY_SONG', playGet);
}

export default urlSaga;
