const infoReducer = (state = {
    uploading: false,
    uploadingComplete: false,
    uploadError: false,
    downloading: false,
    downloadError: false,
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
        case 'START_DOWNLOAD':
            return {
                ...state,
                downloading: true,
            };
        case 'FINISH_DOWNLOAD':
            return {
                ...state,
                downloading: false,
            }
        case 'CONFIRM_DOWNLOAD':
            return {
                ...state,
                downloadingComplete: false,
            }
        case 'DOWNLOAD_ERROR':
            return {
                ...state,
                downloadError: true,
            }
        case 'CONFIRM_DOWNLOAD_ERROR':
            return {
                ...state,
                downloadError: false,
            }
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default infoReducer;