import React from 'react';
import UploadDialog from './UploadDialog';
import DownloadDialog from './DownloadDialog';
import DeleteProjectDialog from './DeleteProjectDialog';
import LoginDialog from './LoginDialog';
import RegistrationDialog from './RegisterDialog';

const Dialogs = props => {
    return (
        <div>
            <UploadDialog/>
            <DownloadDialog/>
            <DeleteProjectDialog/>
            <LoginDialog/>
            <RegistrationDialog/>
        </div>
    );
}

export default Dialogs;
