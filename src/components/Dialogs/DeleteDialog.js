import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Typography, IconButton } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';

const UploadDialog = props => {
    return (
        <div>
            <Dialog open={props.messages.deleting}>
                <Typography variant="h4">Processing</Typography>
                <Typography variant="body1">
                    This remix is being scoured from the site. Please hold.
                </Typography>
            </Dialog>
            <Dialog open={props.messages.deletingComplete}>
                <Typography variant="h4">Success</Typography>
                <Typography variant="body1">No trace remains</Typography>
                <IconButton onClick={() => props.dispatch({ type: 'CONFIRM_DELETE' })}>
                    <CheckCircle />Excellent
                </IconButton>
            </Dialog>
            <Dialog open={props.messages.deletingError}>
                <Typography variant="h4">Failure</Typography>
                <Typography variant="body1">
                    Something foul has occured! Please forgive Music Hub.
                </Typography>
                <IconButton onClick={() => props.dispatch({ type: 'CONFIRM_DELETE_ERROR' })}>
                    <Error />Nooo!
                </IconButton>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(UploadDialog);
