import React, { Component } from 'react';
import { connect } from 'react-redux';

class Explore extends Component {

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
        this.props.dispatch({type: 'NEW_PROJECT', payload: this.state.projectName});
        this.setState({
            projectName: '',
        });
    }

    render() {
        return (
            <div>
                <h1 id="welcome">
                    New Project
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.projectName} type="text" placeholder="Name your Project" required />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}


// this allows us to use <App /> in index.js
export default connect()(Explore);
