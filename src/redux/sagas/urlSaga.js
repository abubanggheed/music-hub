import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* urlAvailability(action) {
    try {
        const availibility = yield axios.get('api/url/available/' + action.payload);
        yield dispatch({ type: 'SET_URLS', payload: availibility.data});
    } catch (error) {
        console.log('error getting url availability:', error);
    }
}


function* urlSaga() {
    yield takeLatest('GET_URLS', urlAvailability);
}

export default urlSaga;
