import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { SubdirectoryArrowLeftTwoTone } from '@material-ui/icons';

class ProjectButton extends Component {


    handleClick = () => {
        this.props.dispatch({type: 'PROJECT_SONGS', payload: this.props.page});
        this.props.dispatch({type: 'PROJECT_INFO', payload: this.props.page});
        this.props.history.push('/explore/' + this.props.page);
    }

    render() {
        return (
            <div>
                <IconButton color="secondary" onClick={this.handleClick}><SubdirectoryArrowLeftTwoTone /></IconButton>
            </div>
        );
    }
}

export default connect()(withRouter(ProjectButton));
