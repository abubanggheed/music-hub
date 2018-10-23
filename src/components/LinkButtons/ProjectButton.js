import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectButton extends Component {


    handleClick = () => {
        this.props.dispatch({type: 'PROJECT_SONGS', payload: this.props.page});
        this.props.history.push('/explore/' + this.props.page);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Project Page</button>
            </div>
        );
    }
}

export default connect()(withRouter(ProjectButton));
