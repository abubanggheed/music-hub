import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InputLabel, Input } from '@material-ui/core';

class ProjectForm extends Component {

    state = {
        projectName: '',
    }

    handleChange = event => {
        this.setState({
            projectName: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'NEW_PROJECT', payload: {name: this.state.projectName, user: this.props.user.id } });
        this.setState({
            projectName: '',
        });
        this.props.history.push('/projects');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>New Project</h3>
                    <InputLabel>Project Name
                        <Input onChange={this.handleChange} value={this.state.projectName} type="text" placeholder="Name your Project" required />
                    </InputLabel>
                    <pre>
                        <Input type="submit" value="Add To Your Projects" />
                    </pre>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withRouter(ProjectForm));
