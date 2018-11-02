import React from 'react';
import UploadDialog from './UploadDialog';
import DeleteDialog from './DeleteDialog';
import DownloadDialog from './DownloadDialog';
import DeleteProjectDialog from './DeleteProjectDialog';
import LoginDialog from './LoginDialog';
import RegistrationDialog from './RegisterDialog';
//sort of like an index.js, all the dialogues are put here, and opened when needed
//their primary purpose is to prevent the user from mucking around when important
//things are happening, like the transfering of files.
//they are opened and closed wherever they are needed, such as in a saga, or button click
const Dialogs = props => {
    return (
        <div>
            <UploadDialog/>
            <DeleteDialog />
            <DownloadDialog/>
            <DeleteProjectDialog/>
            <LoginDialog/>
            <RegistrationDialog/>
        </div>
    );
}

export default Dialogs;
