const infoReducer = (state = {
    uploading: false,
    uploadingComplete: false,
    uploadError: false,
}, action) => {
    switch (action.type) {
        case 'START_UPLOAD':
            return {
                ...state,
                uploading: true,
            };
        case 'FINISH_UPLOAD':
            return {
                ...state,
                uploading: false,
                uploadingComplete: true,
            }
        case 'CONFIRM_UPLOAD':
            return {
                ...state,
                uploadingComplete: false,
            }
        case 'UPLOAD_ERROR':
            return {
                ...state,
                uploadError: true,
            }
        case 'CONFIRM_ERROR':
            return {
                ...state,
                uploadError: false,
            }
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default infoReducer;