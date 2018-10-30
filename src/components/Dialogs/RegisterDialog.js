import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Typography, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const RegisterDialog = props => {
    return (
        <div>
            <Dialog open={props.messages.registrationError}>
                <Typography variant="h4">Fatal Error</Typography>
                <Typography variant="body1">{props.error}</Typography>
                <IconButton onClick={() => props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR'})}><ArrowBack/> Okay</IconButton>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({ messages: state.messages, error: state.errors.registrationMessage });

export default connect(mapStateToProps)(RegisterDialog);
