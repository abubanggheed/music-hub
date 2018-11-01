import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import './notifications.css';

class NotificationPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_NOTIFICATIONS' });
    }

    render() {
        return (
            <div>
                <h1 className="welcome">
                    Notifications
                </h1>
                <div className="outerDiv">
                    <Paper>
                        <div className="innerDiv">

                            {this.props.notifications.length > 0 ? 
                            <ul className="notificationsList">
                                {this.props.notifications.map(notification => (
                                    <li key={notification.id}>{notification.content}</li>
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
