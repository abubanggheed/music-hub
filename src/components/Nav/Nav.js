import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';
import Footer from '../Footer/Footer';
import { HomeOutlined, SearchSharp, InfoOutlined, PermDeviceInformation, FiberManualRecord, MusicVideo, NotesOutlined } from '@material-ui/icons'
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Music Hub</h2>
    </Link>
    <div>
      <MenuItem>
        <Link className="nav-link" to="/home">
          <HomeOutlined />
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Home' : 'Login'}
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="nav-link" to="/explore">
          <SearchSharp />
          Explore
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="nav-link" to="/info">
          <InfoOutlined />
          Info
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="nav-link" to="/about">
          <PermDeviceInformation />
          About
        </Link>
      </MenuItem>
      {props.user.id && (
        <>
          <MenuItem>
            <Link className="nav-link" to="/projects">
              <FiberManualRecord />
              My Projects
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="nav-link" to="/songs">
              <MusicVideo />
              My Songs
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="nav-link" to="/notifications">
              <NotesOutlined />
              Notifications
              {props.notifications.length > 0 && ` (${props.notifications.length})`}
            </Link>
          </MenuItem>
          <MenuItem>
            <LogOutButton className="nav-link" />
          </MenuItem>
        </>
      )}
    </div>
    <Footer />
  </div>


);

const mapStateToProps = state => ({
  user: state.user,
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Nav);
