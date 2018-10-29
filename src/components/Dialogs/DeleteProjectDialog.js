import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Typography, IconButton } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';

const DeleteProjectDialog = props => {
    return (
        <div>
            <Dialog open={props.messages.projectDeleting}>
                <Typography variant="h4">Processing</Typography>
                <Typography variant="body1">
                    Your entire project is being deleted.
                </Typography>
            </Dialog>
            <Dialog open={props.messages.projectDeletingComplete}>
                <Typography variant="h4">Success</Typography>
                <Typography variant="body1">You have deleted a project. I hope you're happy.</Typography>
                <IconButton onClick={() => props.dispatch({ type: 'PROJECT_FINISH_DELETE' })}>
                    <CheckCircle />I Regret Nothing
                </IconButton>
            </Dialog>
            <Dialog open={props.messages.projectDeletingError}>
                <Typography variant="h4">Failure</Typography>
                <Typography variant="body1">
                    Something foul has occured! Please forgive Music Hub.
                </Typography>
                <IconButton onClick={() => props.dispatch({ type: 'PROJECT_CONFIRM_ERROR' })}>
                    <Error />Nooo!
                </IconButton>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(DeleteProjectDialog);
