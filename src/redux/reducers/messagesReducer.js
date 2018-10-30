const infoReducer = (state = {
    uploading: false,
    uploadingComplete: false,
    uploadError: false,
    downloading: false,
    downloadError: false,
    projectDeleting: false,
    projectDeletingComplete: false,
    projectDeletingError: false,
    loginError: false,
    registrationError: false,
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
        case 'START_PROJECT_DELETE':
            return {
                ...state,
                projectDeleting: true,
            };
        case 'PROJECT_CONFIRM_DELETE':
            return {
                ...state,
                projectDeleting: false,
                projectDeletingComplete: true,
            }
        case 'PROJECT_FINISH_DELETE':
            return {
                ...state,
                projectDeletingComplete: false,
            }
        case 'PROJECT_DELETE_ERROR':
            return {
                ...state,
                projectDeletingError: true,
            }
        case 'PROJECT_CONFIRM_ERROR':
            return {
                ...state,
                projectDeletingError: false,
            }
        case 'CLEAR_LOGIN_ERROR':
            return {
                ...state,
                loginError: false,
            }
        case 'OPEN_LOGIN_ERROR':
            return {
                ...state,
                loginError: true,
            }
        case 'CLEAR_REGISTRATION_ERROR':
            return {
                ...state,
                registrationError: false,
            }
        case 'OPEN_REGISTRATION_ERROR':
            return {
                ...state,
                registrationError: true,
            }
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default infoReducer;