import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider, Grid } from '@material-ui/core';
import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import MyProjects from '../MyProjects/MyProjects';
import MySongs from '../MySongs/MySongs';
import Explore from '../Explore/Explore';
import ProjectForm from '../ProjectForm/ProjectForm';
import ProjectPage from '../ProjectPage/ProjectPage';
import ActiveAudio from '../ActiveAudio/ActiveAudio';
import Dialogs from '../Dialogs/AllDialogs';
import NotificationPage from '../NotificationPage/NotificationPage';
import { lightBlue, deepPurple, blueGrey } from '@material-ui/core/colors';

import './App.css';
//the theme chooses colors for the application. The typography section allows the
//application to use the more up to date typography.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: lightBlue,
    secondary: blueGrey,
    error: deepPurple,
  },
});

class App extends Component {
  componentDidMount() {
    //sees if there is existing user data stored in the browser, and automatically
    //sends in that username and password.
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_NOTIFICATIONS' });
  }

  render() {
    return (
      //the theme wraps everything so that all may have access to the colors.
      <MuiThemeProvider theme={theme}>
        {/* the router tag wraps all routes that show up on the dom */}
        <Router>
          <Grid container>
            <Grid container direction="column" sm={2} item>
              <Nav />
            </Grid>
            <Grid container direction="column" sm={10} item>
              {/* the nav bar goes here */}
              <Switch>
                <Redirect exact from="/" to="/home" />
                <Route
                  exact
                  path="/about"
                  component={AboutPage}
                />
                <Route
                  exact
                  path="/explore"
                  component={Explore}
                />
                {/* "protected" routes are only available for a logged in user.
            A user probably wouldn't appreciate all the 403s from visiting these pages
            when not logged in. */}
                <ProtectedRoute
                  exact
                  path="/home"
                  component={UserPage}
                />
                <ProtectedRoute
                  exact
                  path="/newProject"
                  component={ProjectForm}
                />
                <Route
                  exact
                  path="/info"
                  component={InfoPage}
                />
                <ProtectedRoute
                  exact
                  path="/projects"
                  component={MyProjects}
                />
                <ProtectedRoute
                  exact
                  path="/songs"
                  component={MySongs}
                />
                <ProtectedRoute
                  exact
                  path="/notifications"
                  component={NotificationPage}
                />
                <Route
                  exact
                  path="/explore"
                  component={Explore}
                />
                <Route
                  path="/explore/:id"
                  component={ProjectPage}
                />
                {/* If none of the other routes matched, we will show a 404. */}
                <Route render={() => <h1>404</h1>} />
              </Switch>
              <ActiveAudio />
              {/* here lie many dialogs that are managed by redux state */}
              <Dialogs />
            </Grid>
          </Grid>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default connect()(App);
