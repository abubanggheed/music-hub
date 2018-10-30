import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Typography, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const LoginDialog = props => {
    return (
        <div>
            <Dialog open={props.messages.loginError}>
                <Typography variant="h4">Fatal Error</Typography>
                <Typography variant="body1">{props.error}</Typography>
                <IconButton onClick={() => props.dispatch({ type: 'CLEAR_LOGIN_ERROR'})}><ArrowBack/> Okay</IconButton>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({ messages: state.messages, error: state.errors.loginMessage });

export default connect(mapStateToProps)(LoginDialog);
