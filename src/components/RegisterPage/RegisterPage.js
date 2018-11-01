import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, InputLabel, Button } from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.email) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
      this.props.dispatch({ type: 'OPEN_REGISTRATION_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
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
            <InputLabel htmlFor="email">
              Email:
              <Input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </InputLabel>
          </div>
          <div>
            <Input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <p>
            Note: your email address will be ignored by this application except for special circumstances.
          </p>
          <Button
            variant="contained"
            color="primary"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

