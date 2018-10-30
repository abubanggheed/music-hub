import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, InputLabel } from '@material-ui/core';
import AnonymousButton from '../LinkButtons/AnonymousButton';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <InputLabel htmlFor="username">
              Username:
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </InputLabel>
          </div>
          <div>
            <InputLabel htmlFor="password">
              Password:
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </InputLabel>
          </div>
          <div>
            <Input
              type="submit"
              name="submit"
              value="Log In"
              className="log-in"
            />
          </div>
        </form>
        <center>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          >
            Register
          </Button>
          <pre>
            <AnonymousButton />
          </pre>
        </center>
      </div>
    );
  }
}

export default connect()(LoginPage);
