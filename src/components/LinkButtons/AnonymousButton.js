import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';


class AnonymousButton extends Component {


    handleClick = () => {
        this.props.dispatch({type: 'PROJECTS' });
        this.props.history.push('/explore');
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClick}>Continue as Anonymous</Button>
            </div>
        );
    }
}

export default connect()(withRouter(AnonymousButton));
