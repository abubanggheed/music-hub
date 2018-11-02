import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Typography, IconButton } from '@material-ui/core';
import { Error } from '@material-ui/icons';

const DownloadDialog = props => {
    return (
        <div>
            <Dialog open={props.messages.downloading}>
                <div className="generalDialog">
                    <Typography variant="h4">Processing</Typography>
                    <Typography variant="body1">
                        Downloading content.
                </Typography>
                </div>
            </Dialog>
            <Dialog open={props.messages.downloadError}>
                <div className="generalDialog">
                    <Typography variant="h4">Failure</Typography>
                    <Typography variant="body1">
                        Something foul has occured! Please forgive Music Hub.
                </Typography>
                    <IconButton onClick={() => props.dispatch({ type: 'CONFIRM_DOWNLOAD_ERROR' })}>
                        <Error />Nooo!
                </IconButton>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(DownloadDialog);
