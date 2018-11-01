import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getNotifications(action) {
    try {
        const response = yield axios.get('/api/notification');
        yield dispatch({ type: 'SET_NOTIFICATIONS', payload: response.data });
    } catch (error) {
        console.log('error in getting notifications:', error);
    }
}

function* deleteNotification(action) {
    try {
        yield axios.delete('/api/notification/one/' + action.payload);
        yield dispatch({ type: 'GET_NOTIFICATIONS' });
    } catch (error) {
        console.log('error in deleting one notification:', error);
    }
}

function* clearNotifications(action) {
    try {
        yield axios.delete('/api/notification/all');
        yield dispatch({ type: 'GET_NOTIFICATIONS' });
    } catch (error) {
        console.log('error in clearing notifications:', error);
    }
}

function* notificationSaga() {
    yield takeLatest('GET_NOTIFICATIONS', getNotifications);
    yield takeLatest('DELETE_NOTIFICATION', deleteNotification);
    yield takeLatest('CLEAR_NOTIFICATIONS', clearNotifications);
}

export default notificationSaga;
