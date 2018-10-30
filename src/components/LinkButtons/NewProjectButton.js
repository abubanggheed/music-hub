import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { FolderOpenOutlined } from '@material-ui/icons';

class ProjectButton extends Component {

//this button brings the user to the new project form
    handleClick = () => {
        this.props.history.push('/newProject');
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.handleClick}><FolderOpenOutlined /> New Project</IconButton>
            </div>
        );
    }
}

export default connect()(withRouter(ProjectButton));
