import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Typography, IconButton } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';

const UploadDialog = props => {
    return (
        <div>
            <Dialog open={props.messages.uploading}>
                <Typography variant="h4">Processing</Typography>
                <Typography variant="body1">
                Your upload is being processed. Your patience is mandatory.
                </Typography>
            </Dialog>
            <Dialog open={props.messages.uploadingComplete}>
                <Typography variant="h4">Success</Typography>
                <Typography variant="body1">Your upload is successful.</Typography>
                <IconButton onClick={() => props.dispatch({ type: 'CONFIRM_UPLOAD' })}>
                    <CheckCircle />Excellent
                </IconButton>
            </Dialog>
            <Dialog open={props.messages.uploadError}>
                <Typography variant="h4">Failure</Typography>
                <Typography variant="body1">
                    Something foul has occured! Please forgive Music Hub.
                </Typography>
                <IconButton onClick={() => props.dispatch({ type: 'CONFIRM_ERROR' })}>
                    <Error />Nooo!
                </IconButton>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(UploadDialog);
