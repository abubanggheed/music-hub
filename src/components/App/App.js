import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

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
import { lightBlue, deepPurple, blueGrey } from '@material-ui/core/colors';

import './App.css';

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
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
              <Nav />
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
                <ProtectedRoute
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
            <Dialogs />
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default connect()(App);
