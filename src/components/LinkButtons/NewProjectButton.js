import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectButton extends Component {


    handleClick = () => {
        this.props.history.push('/newProject');
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>New Project</button>
            </div>
        );
    }
}

export default connect()(withRouter(ProjectButton));
