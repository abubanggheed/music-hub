import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, IconButton, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import './notifications.css';

class NotificationPage extends Component {

    handleDelete = id => {
        this.props.dispatch({ type: 'DELETE_NOTIFICATION', payload: id });
    }

    handleClear = () => {
        this.props.dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    }

    render() {
        return (
            <div>
                <h1 className="welcome">
                    Notifications
                </h1>
                <div className="outerDiv">
                    <Button color="secondary" variant="contained" onClick={this.handleClear} disabled={this.props.notifications.length === 0}>Clear All</Button>
                    <Paper>
                        <div className="innerDiv">
                            {this.props.notifications.length > 0 ? 
                            <ul className="notificationsList">
                                {this.props.notifications.map(notification => (
                                    <li key={notification.id}>
                                    <IconButton onClick={() => this.handleDelete(notification.id)}>
                                        <Delete />
                                    </IconButton>
                                    {notification.content}
                                    </li>
                                ))}
                            </ul> :
                                <p>
                                    You have no new notifications.
                                </p>
                            }
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ notifications }) => ({
    notifications
});

export default connect(mapStateToProps)(NotificationPage);
