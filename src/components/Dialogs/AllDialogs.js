import React from 'react';
import UploadDialog from './UploadDialog';
import DownloadDialog from './DownloadDialog';

const Dialogs = props => {
    return (
        <div>
            <UploadDialog/>
            <DownloadDialog/>
        </div>
    );
}

export default Dialogs;
