import React from 'react';
import UploadDialog from './UploadDialog';
import DownloadDialog from './DownloadDialog';
import DeleteProjectDialog from './DeleteProjectDialog';

const Dialogs = props => {
    return (
        <div>
            <UploadDialog/>
            <DownloadDialog/>
            <DeleteProjectDialog/>
        </div>
    );
}

export default Dialogs;
