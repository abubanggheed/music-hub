const downloadReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOWNLOAD':
            return { ...state, download: action.payload };
        case 'QUEUE_SONG':
            return {...state, next: action.payload}
        case 'FINISH_SONG':
            return {...state, current: state.next}
            //queue song and finish song are made this way so that in the future
            //it will be possible to use this reducer to queue up the next song to
            //be played in advance, without making getting it from the storage on the spot.
        case 'CLEAR_DOWNLOAD':
            return {...state, download: null}
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default downloadReducer;
