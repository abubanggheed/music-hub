import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Typography, IconButton } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
//Typography is a stylistic component that has no functional purpose
const UploadDialog = props => {
    return (
        <div>
            <Dialog open={props.messages.deleting}>
                <div className="generalDialog">
                    <Typography variant="h4">Processing</Typography>
                    <Typography variant="body1">
                        This remix is being scoured from the site. Please hold.
                </Typography>
                </div>
            </Dialog>
            <Dialog open={props.messages.deletingComplete}>
                <div className="generalDialog">
                    <Typography variant="h4">Success</Typography>
                    <Typography variant="body1">No trace remains</Typography>
                    <IconButton onClick={() => props.dispatch({ type: 'CONFIRM_DELETE' })}>
                        <CheckCircle />Excellent
                </IconButton>
                </div>
            </Dialog>
            <Dialog open={props.messages.deletingError}>
                <div className="generalDialog">
                    <Typography variant="h4">Failure</Typography>
                    <Typography variant="body1">
                        Something foul has occured! Please forgive Music Hub.
                </Typography>
                    <IconButton onClick={() => props.dispatch({ type: 'CONFIRM_DELETE_ERROR' })}>
                        <Error />Nooo!
                </IconButton>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(UploadDialog);
