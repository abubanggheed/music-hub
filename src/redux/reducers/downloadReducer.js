const downloadReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOWNLOAD':
            return { ...state, download: action.payload };
        case 'QUEUE_SONG':
            return {...state, next: action.payload}
        case 'FINISH_SONG':
            return {...state, current: state.next}
        case 'CLEAR_DOWNLOAD':
            return {...state, download: null}
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default downloadReducer;
